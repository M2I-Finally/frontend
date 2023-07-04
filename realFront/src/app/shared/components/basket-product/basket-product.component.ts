import { Component,Input } from '@angular/core';
import { CartLine } from '../../entities/cart-line';

@Component({
  selector: 'basket-product',
  templateUrl: './basket-product.component.html',
  styleUrls: ['./basket-product.component.scss']
})
export class BasketProductComponent {
    @Input() cartLine? :CartLine ;
   
    
    minus(){
     
      if(this.cartLine && this.cartLine?.getQuantity() > 0)
       this.cartLine.setQuantity(-1);     
    
  }

  add(){
    
    if(this.cartLine)
       this.cartLine.setQuantity(1);
  }

    
}
