import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Cart } from 'src/app/shared/entities/cart';
import { BasketService } from 'src/app/shared/services/basket.service';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { Payment } from 'src/app/shared/entities/payment';
import { CartLine } from 'src/app/shared/entities/cart-line';
import { PaymentDto } from 'src/app/shared/entities/payment-dto';

@Component({
  selector: 'app-payment-confirmation-page',
  templateUrl: './payment-confirmation-page.component.html',
  styleUrls: ['./payment-confirmation-page.component.scss']
})
export class PaymentConfirmationPageComponent implements OnInit {
  total!: number
  basket$!: Cart;
  basketLine!:CartLine[];
  amount:number = 0;
  paymentTypeId:number | undefined;
  payment$!: Payment;
  sellerId!:number;
  discount!:number;
  paymentDtoList: PaymentDto[] = [];


  constructor(private basketService: BasketService, private paymentService:PaymentService, private router: Router) { };
  
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
    })
     

  };

  updatePayment(formGroupName:UntypedFormGroup, name:string, paymentType:string){
    // get the payment input
    
    this.amount = formGroupName.controls[name].value;
    // update total
    this.total -= this.amount;
    // note payment id
    this.paymentTypeId = parseInt(formGroupName.controls[paymentType].value);

    this.paymentDtoList.push(new PaymentDto(this.amount, this.paymentTypeId));

    if (this.total === 0 ){
      //ferme la fenetre
      this.paymentService.postPayment(
        new Payment(this.basketLine,
           this.total,
           this.discount,
           this.paymentDtoList,
           this.sellerId)
       ).subscribe({
        next: data => console.log(data)
       });
    }
    console.log(`updatePayment(${formGroupName.controls}) called, paymenttypeId ${this.paymentTypeId}, update List ${this.paymentDtoList}`)

  }

  
  // cardSubmit(){
  //   console.log("cardSubmit() called")
  //   this.paymentDtoList.push(new PaymentDto(this.basket$.getTotal(),1));
  //   this.paymentService.postPayment(
  //     new Payment(this.basketLine,
  //        this.total,
  //        this.discount,
  //        this.paymentDtoList,
  //        this.sellerId)
  //    );
  // };

  // cashSubmit(){
  //   console.log("cashSubmit() called")
  //   this.paymentDtoList.push(new PaymentDto(this.basket$.getTotal(),0));
  //   this.paymentService.postPayment(
  //     new Payment(this.basketLine,
  //        this.total,
  //        this.discount,
  //        this.paymentDtoList,
  //        this.sellerId)
  //    );
  // };

  // otherSubmit(){
  //   console.log("otherSubmit() called")
  //   this.paymentDtoList.push(new PaymentDto(this.basket$.getTotal(),2));
  //   this.paymentService.postPayment(
  //     new Payment(this.basketLine,
  //        this.total,
  //        this.discount,
  //        this.paymentDtoList,
  //        this.sellerId)
  //    );
  // };

  Submit(paymentId:number){
    this.paymentDtoList.push(new PaymentDto(this.basket$.getTotal(),paymentId));
    this.paymentService.postPayment(
      new Payment(this.basketLine,
         this.total,
         this.discount,
         this.paymentDtoList,
         this.sellerId)
     ).subscribe({
      next: data => console.log(data)
     });
     
  }
}
