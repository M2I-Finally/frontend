import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Cart } from 'src/app/shared/entities/cart';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'app-payment-confirmation-page',
  templateUrl: './payment-confirmation-page.component.html',
  styleUrls: ['./payment-confirmation-page.component.scss']
})
export class PaymentConfirmationPageComponent implements OnInit {
  total!: number
  basket$!: Cart;
  constructor(private basketService: BasketService) { };
  
  formPayByCard = new UntypedFormGroup({
    sumCard:new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(this.total)])
  });
  
  formPayByCash = new UntypedFormGroup({
    sumCash:new UntypedFormControl('', [Validators.required, Validators.min(0), Validators.max(this.total)])
  });

  formPayByOther = new UntypedFormGroup({
    sumOther:new UntypedFormControl('', [Validators.required, Validators.min(0),Validators.max(this.total)])
  });

  ngOnInit(): void {
    this.basketService.basket$.subscribe((basket: Cart) => {
      this.basket$ = basket;
      this.total = this.basket$.getTotal();
    })

  };

  submit(){
    console.log("submit() called")
  };
}
