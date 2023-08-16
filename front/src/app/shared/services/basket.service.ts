import { Injectable } from '@angular/core';
import { Basket } from '../entities/basket';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaymentDto } from '../entities/payment-dto';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  
  paidBasket : Basket = new Basket([],0,1);
  idPaidBasket: number = 0;
  private basketSubject: BehaviorSubject<Basket>;
  basket$: Observable<Basket>;
  paymentsDtoList : PaymentDto[] =[];

  constructor() {
    this.basketSubject = new BehaviorSubject<Basket>(new Basket([], 0, 1));
    this.basket$ = this.basketSubject.asObservable();
   }
   
   updateBasket(newBasket: Basket) {
    this.basketSubject.next(newBasket);
  } 

  SavePaidBasket(basket : Basket, idBasket : number, paymentsDto : PaymentDto[]){   
    this.paidBasket = basket;
    this.idPaidBasket = idBasket;    
    for(let pay of paymentsDto){      
      this.paymentsDtoList.push(pay)
    }
  }

  clearPaidBasket(){
    this.paidBasket = new Basket([],0,1);
    this.paymentsDtoList=[];
    this.idPaidBasket = 0;
  }
}
