import { Component, OnInit } from '@angular/core';

import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Cart } from 'src/app/shared/entities/cart';
import { BasketService } from 'src/app/shared/services/basket.service';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { Payment } from 'src/app/shared/entities/payment';
import { CartLine } from 'src/app/shared/entities/cart-line';
import { PaymentDto } from 'src/app/shared/entities/payment-dto';
import { ToastrService } from 'ngx-toastr';
import { Jwt } from 'src/app/shared/entities/jwt';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-payment-confirmation-page',
  templateUrl: './payment-confirmation-page.component.html',
  styleUrls: ['./payment-confirmation-page.component.scss']
})

export class PaymentConfirmationPageComponent implements OnInit {
  total!: number
  totalAfterDiscount: number | undefined;
  cartModified:boolean | undefined;
  basket$!: Cart;
  basketLine!:CartLine[];
  amount:number = 0;
  amountDue:number = 0;
  amountPaid:number = 0;
  change:number= 0;
  paymentTypeId:number | undefined;
  payment$!: Payment;
  sellerId:number = 999;
  discount:number = 1;
  paymentDtoList: PaymentDto[] = [];

  constructor(private basketService: BasketService, private paymentService:PaymentService,private toastr: ToastrService, private router: Router) { };
  
  formPayByCard = new UntypedFormGroup({
    sumCard:new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(this.total)]),
    BANK_CAR:new UntypedFormControl(1)
  });
  
  formPayByCash = new UntypedFormGroup({
    sumCash:new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(this.total)]),
    CASH:new UntypedFormControl(0)
  });

  formPayByOther = new UntypedFormGroup({
    sumOther:new UntypedFormControl('', [Validators.required, Validators.min(0),Validators.max(this.total)]),
    OTHER:new UntypedFormControl(2)
  });

  ngOnInit(): void {
    /**
     * get basket from service
     */
    this.basketService.basket$.subscribe((basket: Cart) => {
      this.basket$ = basket;
      this.total = this.basket$.getTotal();
      this.basketLine = basket.getCartLines();
    })
    
    /**
     * initialize amountDue
     */

    this.amountDue = this.total;
    /**
     * get seller id
     */
    let sessionToken = sessionStorage.getItem('token');
    let decoded: Jwt = jwt_decode(sessionToken!);
    this.sellerId = decoded.id;
    
  };

  /**
   * update total if there is any discount applied
   * @param event totalAfterDiscount from recap-list
   */
  totalWithDiscount(event:number){
    this.totalAfterDiscount = event;
    // if totalAfterDiscount is smaller than total, means we have applied a discount and the total should be updated. 
    if (this.totalAfterDiscount < this.total){
      this.discount = 1 - this.totalAfterDiscount/this.total;
      this.total = this.totalAfterDiscount;
      this.basket$.setTotal(this.total);
      this.isCartLineModified(true);
    }
  };

  /**
   * Partial payment
   * @param formGroupName get payment amount from input
   * @param name FormControlName for input
   * @param paymentType 0 = cash, 1 = bank card, 2 = other
   */
  updatePayment(formGroupName:UntypedFormGroup, name:string, paymentType:string){
    // get the payment input
    this.amount = formGroupName.controls[name].value;

    // update total
    if (this.total>0){
      this.amountPaid += this.amount;
      if(this.amountPaid<this.total){
        this.amountDue = this.total - this.amountPaid;  
      } else {
        this.amountDue = 0;
        this.change = this.amountPaid - this.total;
      }
      
    } else {
      this.toastr.error("Il n'y a rien à payer.")
    }
    
    // get payment id
    this.paymentTypeId = parseInt(formGroupName.controls[paymentType].value);

    // note partial payment amount and id
    this.paymentDtoList.push(new PaymentDto(this.amount, this.paymentTypeId));
    
  }

  /**
    * total payment
    * @param paymentTypeId 0 = cash, 1 = bank card, 2 = other
    */
  Submit(paymentTypeId:number){
    this.paymentDtoList.push(new PaymentDto(this.amountDue,paymentTypeId));
    this.createBasket();    
    
  }
  
   /**
   * Any modification for quantity will update payment situation.
   * @param event if quantity is changed. 
   */
   isCartLineModified(event:boolean){
    this.cartModified = event;
    
    if (this.cartModified ){
      
      this.amountDue = this.total-this.amountPaid;
      if(this.amountDue>=0){
        this.change = 0;
      } 

      if(this.amountDue<0) {
        this.change = this.amountPaid - this.total
        this.amountDue = 0
      } 
    }
  }

  /**
   * cancel payment
   * reset the cart and noted payment list
   * @param page back to shop
   */
  protected cancelBasket(page:string): void {
    this.basket$.resetCart();
    this.clearPaymentList();
    this.router.navigate([page]);  
  }

  /**
   * valid payment, get success or fail message
   * payment will not pass when there is nothing in the cart nor the cart is been paid.
   */
  protected createBasket():void{
    // cart cannot be empty
    if (this.total > 0 ){
      
      //payment needs to be done
      if (this.amountDue > 0) {
        this.toastr.error("Veuillez finir le paiement.");
      } else {
        this.paymentService.postPayment(
          new Payment(this.basketLine,
             this.total,
             this.discount,
             this.paymentDtoList,
             this.sellerId)
         ).subscribe({
          next: (data) =>{
            this.toastr.success(`Le panier ${data} est bien enregistré, la facture est encours de généreration.`);
            // une fois payé, vider le panier et avancer sur la page facture
            this.cancelBasket('facture');
          }, 
          error: error => this.toastr.error(error.message)
         });
      }
   
    } else {
      this.toastr.error("Le panier n'est pas encore crée.");
      this.cancelBasket('shop');
    }
  }

  /**
   * clear noted payment amount and id in paymentList
   */
  private clearPaymentList(){
    if (this.paymentDtoList.length > 0){
      for (let i=0; i<this.paymentDtoList.length; i++){
        this.paymentDtoList.pop();
      }
    };
  }
}


