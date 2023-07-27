import { Injectable } from '@angular/core';
import { Cart } from '../entities/cart';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  basket : Cart = new Cart([],0,1);
  private basketSubject: BehaviorSubject<Cart>;
  basket$: Observable<Cart>;
  constructor() {
    this.basketSubject = new BehaviorSubject<Cart>(new Cart([], 0, 1));
    this.basket$ = this.basketSubject.asObservable();
    console.log(this.basket$);    
  
   }
   
   updateBasket(newBasket: Cart) {
    this.basketSubject.next(newBasket);
  }
}
