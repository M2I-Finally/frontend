import { Component,Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Basket } from '../../entities/basket';
import { CartLine } from '../../entities/cart-line';
import { Observable, map ,of} from 'rxjs';
import { Cart } from '../../entities/cart';
import { BasketService } from '../../services/basket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(private basketService : BasketService, private router:Router ){}
  //basket : Basket = new Basket("panier");
  //basket$: Observable<CartLine[]> | undefined;
  @Input() quantity!: number;
  total!: number; 
  basket$!: Cart;
  cartLine$!: CartLine[];
  
  
  ngOnInit(): void {
    /**
     * get basket from service and calculate total
     */
    this.basketService.basket$.subscribe((basket: Cart) => {
      this.basket$ = basket;
      this.cartLine$ = basket.getCartLines();
      this.calculateTotal();
    });
  }

  /**
   * calculate total from each line and update to service
   */
  calculateTotal(): void {
    let total = 0;

    this.cartLine$.forEach((cartLine) => {
      total += cartLine.getPrice() * cartLine.getQuantity() * cartLine.getDiscount();
    });

    this.total = total;
    this.basket$.setTotal(total);
  }
 
  /**
   * navigate to given page
   * @param pageName given page
   */
  goToPage(pageName:string): void {
    this.router.navigate([`${pageName}`])
  }

  /**
   * cancel the basket
   */
  protected cancelBasket(): void {
    this.basket$.resetCart();
    this.cartLine$ = this.basket$.getCartLines();
    this.total = 0;
  }  
}
