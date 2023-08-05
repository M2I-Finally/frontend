import { Component, OnInit } from '@angular/core';

import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Cart } from 'src/app/shared/entities/cart';
import { BasketService } from 'src/app/shared/services/basket.service';
import { Router, Event } from '@angular/router';
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
    this.basketService.basket$.subscribe((basket: Cart) => {
      this.basket$ = basket;
      this.total = this.basket$.getTotal();
      this.basketLine = basket.getCartLines();
    })

    //sellerId:
    let sessionToken = sessionStorage.getItem('token');
    let decoded: Jwt = jwt_decode(sessionToken!);
    this.sellerId = decoded.id;
    
  };

  totalWithDiscount(event:number){
    this.totalAfterDiscount = event;
    // if totalAfterDiscount is smaller than total, means we have applied a discount and the total should be updated. 
    if (this.totalAfterDiscount < this.total){
      this.discount = 1 - this.totalAfterDiscount/this.total;
      this.total = this.totalAfterDiscount;
      this.basket$.setTotal(this.total);
    }
  };

  isCartModified(event:boolean){
    this.cartModified = event;
    console.log(this.cartModified);
    if (this.cartModified){
      this.amountPaid = 0;
      this.amountDue = 0;
      this.change = 0;
    }
  }
  updatePayment(formGroupName:UntypedFormGroup, name:string, paymentType:string){
    // get the payment input
    this.amount = formGroupName.controls[name].value;

    // update total
    if (this.total>0){
      if(this.amount<this.total){
        this.total -= this.amount;
        this.amountPaid += this.amount;
        this.amountDue = this.total;  
      } else {
        this.amountPaid += this.amount;
        this.amountDue = 0;
        this.change = this.amount - this.total;
      }

      if (this.total === 0 ){
        this.createBasket();
      }

    } else {
      this.toastr.error("Il n'y a rien à payer.")
    }
    

    // note payment id
    this.paymentTypeId = parseInt(formGroupName.controls[paymentType].value);

    this.paymentDtoList.push(new PaymentDto(this.amount, this.paymentTypeId));

    
  }

  Submit(paymentId:number){
    this.paymentDtoList.push(new PaymentDto(this.basket$.getTotal(),paymentId));
    this.createBasket();
     
  }
  
  protected cancelBasket(page:string): void {
    this.basket$.resetCart();
    this.router.navigate([page]);
    
  }

  protected createBasket():void{
    this.paymentService.postPayment(
      new Payment(this.basketLine,
         this.total,
         this.discount,
         this.paymentDtoList,
         this.sellerId)
     ).subscribe({
      next: (data) =>{
        this.toastr.success(`Le panier ${data} est bien enregistré, facture est encours de générer.`);
        // une fois payé, vider le panier et avancer sur la page facture
        console.log(this.basketLine);
        this.cancelBasket('facture');
      }, 
      error: error => this.toastr.error(error.message)
     });
  }

}


