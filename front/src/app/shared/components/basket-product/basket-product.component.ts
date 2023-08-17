import { Component,Input } from '@angular/core';
import { BasketLine } from '../../entities/basket-line';
import { BasketService } from '../../services/basket.service';
import { Basket } from '../../entities/basket';


@Component({
  selector: 'basket-product',
  templateUrl: './basket-product.component.html',
  styleUrls: ['./basket-product.component.scss']
})
export class BasketProductComponent {
  constructor(private basketService : BasketService){}
  basket$!: Basket;
  @Input() basketLine? :BasketLine ;
  totalLine : number = 0;
  
  ngOnInit(): void {
    this.basketService.basket$.subscribe((basket: Basket) => {
      this.basket$ = basket;
      if(this.basketLine)
        this.totalLine = this.basketLine?.getQuantity() * this.basketLine.getPrice();
      });
   }
 
   /**
    * minus one to basket
    */
  minus(){    
    if(this.basketLine && this.basketLine?.getQuantity() > 0){
      this.basket$.getBasketLines().forEach((line) => {
        if( this.basketLine?.getProductId() == line.getProductId() && line.getQuantity() > 0){           
          line.setQuantity(-1);
          if (line.getQuantity()<=0){   
            this.basket$.removeLines(this.basketLine.getProductId());               
          }            
        }
        this.basketService.updateBasket(this.basket$);
      })
    }
  }

  /**
   * add one to basket
   */
  add(){
   
    if (this.basketLine){
      this.basket$.getBasketLines().forEach((line) => {
        if( this.basketLine?.getProductId() == line.getProductId()){
          line.setQuantity(1);
        }
    })    
      this.basketService.updateBasket(this.basket$);
    }               
  }

  /**
   * remove line
   */
  trash(){
    if(this.basketLine){
      this.basket$.removeLines(this.basketLine.getProductId());
      this.basketService.updateBasket(this.basket$);
    } 
  }
}
