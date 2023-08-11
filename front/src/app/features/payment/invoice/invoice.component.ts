import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/entities/cart';
import { CartLine } from 'src/app/shared/entities/cart-line';
import { Jwt } from 'src/app/shared/entities/jwt';
import { Payment } from 'src/app/shared/entities/payment';
import { PaymentDto } from 'src/app/shared/entities/payment-dto';
import { BasketService } from 'src/app/shared/services/basket.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'facture',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  
  paidBasket: Cart = new Cart([],0,1); 
  currentDate: Date = new Date(); 
  tva:number = 5.5;
  idBasket: number = 0;
  cartLines: CartLine[]=[];
  paymentsDtoList: PaymentDto[]=[];
  items: number = 0;
  sellerId: number=0;

  constructor(private basketService: BasketService){}

  ngOnInit(): void {    
    this.paidBasket = this.basketService.paidBasket;
    this.injectValues();
  }

  close(){
    console.log(this.currentDate)
  }
  
  injectValues(){    
    const token = sessionStorage.getItem('token');    
    let jwtDecoced : Jwt = jwt_decode(token!);
    this.sellerId = jwtDecoced.id
    this.idBasket =   this.basketService.idPaidBasket; 
    this.cartLines = this.paidBasket.getCartLines();
    this.paymentsDtoList = this.basketService.paymentsDtoList;
    for(let cartline of this.cartLines){
      this.items += cartline.getQuantity();
    }
    
  }
}
