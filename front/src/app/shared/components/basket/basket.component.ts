import { Component,Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { BasketLine } from '../../entities/basket-line';
import { Basket } from '../../entities/basket';
import { BasketService } from '../../services/basket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(private basketService : BasketService, private router:Router ){}

  @Input() quantity!: number;
  total!: number; 
  basket$!: Basket;
  basketLine$!: BasketLine[];
  
  ngOnInit(): void {
    /**
     * get basket from service and calculate total
     */
    this.basketService.basket$.subscribe((basket: Basket) => {
      this.basket$ = basket;
      this.basketLine$ = basket.getBasketLines();
      this.calculateTotal();
    });
  }

  /**
   * calculate total from each line and update to service
   */
  calculateTotal(): void {
    let total = 0;

    this.basketLine$.forEach((basketLine) => {
      total += basketLine.getPrice() * basketLine.getQuantity() * basketLine.getDiscount();
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
    // reset basketlines
    this.basket$.resetBasket();
    // update empty basket lines 
    this.basketLine$ = this.basket$.getBasketLines();
    //update total
    this.total = 0;
    //update the productCard quantity
    this.basketService.updateBasket(this.basket$);

  }  
}
