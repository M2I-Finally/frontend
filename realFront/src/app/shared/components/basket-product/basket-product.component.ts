import { Component,Input } from '@angular/core';
import { CartLine } from '../../entities/cart-line';
import { BasketService } from '../../services/basket.service';
import { Cart } from '../../entities/cart';
import { Basket } from '../../entities/basket';

@Component({
  selector: 'basket-product',
  templateUrl: './basket-product.component.html',
  styleUrls: ['./basket-product.component.scss']
})
export class BasketProductComponent {
  constructor(private basketService : BasketService){}
  basket$!: Cart;
  @Input() cartLine? :CartLine ;
  totalLine : number = 0;
  
  ngOnInit(): void {
    this.basketService.basket$.subscribe((basket: Cart) => {
      this.basket$ = basket;
      if(this.cartLine)
     this.totalLine = this.cartLine?.getQuantity() * this.cartLine.getPrice();
    });
   }
 
  minus(){
    
    if(this.cartLine && this.cartLine?.getQuantity() > 0){
      this.basket$.getCartLines().forEach((line) => {
        if( this.cartLine?.getId() == line.getId() && line.getQuantity() > 0){           
          line.setQuantity(-1);         
         
          if (line.getQuantity()<=0){   
            this.basket$.removeLines(this.cartLine.getId());               
          }            
      }
      this.basketService.updateBasket(this.basket$);
    })
    }     
    
  }

  add(){
   
       if (this.cartLine){
          this.basket$.getCartLines().forEach((line) => {
  
          if( this.cartLine?.getId() == line.getId()){ 
            
              line.setQuantity(1);      
                  
          }
  
        })
              
        this.basketService.updateBasket(this.basket$);
      }               
  }

  trash(){
    if(this.cartLine){
      this.basket$.removeLines(this.cartLine.getId());
      this.basketService.updateBasket(this.basket$);
    }
      
  }
    
}
