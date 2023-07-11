import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../entities/product';
import { BasketService } from '../../services/basket.service';
import { CartLine } from 'src/app/shared/entities/cart-line';
import { Cart } from '../../entities/cart';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit{
  constructor(private basketService : BasketService){}
  @Input() product?: Product;
  @Input() quantity!: number;
  basket$!: Cart;  

  ngOnInit(): void {
    this.basketService.basket$.subscribe((basket: Cart) => {
      this.basket$= basket;
    });
  }
     
  minus(){
    
    if ( this.product ){
      
      this.basket$.getCartLines().forEach((line) => {

        if( this.product?.id == line.getId() && line.getQuantity() > 0){           
            line.setQuantity(-1);
            this.quantity = line.getQuantity();      
           
            if (line.getQuantity()==0){   
              this.basket$.removeLines(this.product?.id);               
            }            
        }
        this.basketService.updateBasket(this.basket$);
      })
    }    
  }

  add(){
    let lineExist : boolean = false;

    if (this.product){
      this.basket$.getCartLines().forEach((line) => {

        if( this.product?.id == line.getId()){ 
          //if ( line.getQuantity() < this.product.stock ){
            line.setQuantity(1);
            this.quantity = line.getQuantity();           
          //}          
          lineExist = true;
        }

      })
      if (!lineExist){              
        let cartLine = new CartLine(this.product?.id | 0,this.product?.name,this.product?.price,1,1);
        this.basket$.addLines(cartLine);
        this.quantity = cartLine.getQuantity();       
      }
      
      this.basketService.updateBasket(this.basket$);
    }               
  } 
  
}
