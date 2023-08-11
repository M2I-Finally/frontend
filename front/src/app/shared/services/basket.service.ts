import { Injectable } from '@angular/core';
import { Cart } from '../entities/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Payment } from '../entities/payment';
import { PaymentDto } from '../entities/payment-dto';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  
  paidBasket : Cart = new Cart([],0,1);
  idPaidBasket: any = 0;
  private basketSubject: BehaviorSubject<Cart>;
  basket$: Observable<Cart>;
  paymentsDtoList : PaymentDto[] =[];

  constructor() {
    this.basketSubject = new BehaviorSubject<Cart>(new Cart([], 0, 1));
    this.basket$ = this.basketSubject.asObservable();
   
    //console.log(this.basket$);

   }
   
   updateBasket(newBasket: Cart) {
    this.basketSubject.next(newBasket);
  } 

  SavePaidBasket(basket : Cart, idBasket : number, paymentsDto : PaymentDto[]){
    console.log("dans save basket : " + paymentsDto.length)
    console.log("voici le paymentDto reçu dans le nasket.service : "+paymentsDto)
    this.paidBasket = basket;
    this.idPaidBasket = idBasket;
    
    //console.log("dans save basket apres insertion : " + this.paymentsDtoList.length)
    for(let pay of paymentsDto){      
      this.paymentsDtoList.push(pay)
    }
  }

  clearPaidBasket(){
    this.paidBasket = new Cart([],0,1);
    this.idPaidBasket = 0;
  }
}
