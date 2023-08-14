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
   }
   
   updateBasket(newBasket: Cart) {
    this.basketSubject.next(newBasket);
  } 

  SavePaidBasket(basket : Cart, idBasket : number, paymentsDto : PaymentDto[]){   
    this.paidBasket = basket;
    this.idPaidBasket = idBasket;    
    for(let pay of paymentsDto){      
      this.paymentsDtoList.push(pay)
    }
  }

  clearPaidBasket(){
    this.paidBasket = new Cart([],0,1);
    this.paymentsDtoList=[];
    this.idPaidBasket = 0;
  }
}
