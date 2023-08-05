import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../../entities/product';
import { BasketService } from '../../services/basket.service';
import { CartLine } from 'src/app/shared/entities/cart-line';
import { Cart } from '../../entities/cart';
import { _isNumberValue } from '@angular/cdk/coercion';
import { Environment } from 'src/environment/environment';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit{
  constructor(private basketService : BasketService){}
  placeholderUrl = Environment.imagePlaceholderUrl;

  @Input() product?: Product;
  @Input() quantity!: number;  
  basket$!: Cart;  

  ngOnInit(): void {
    this.basketService.basket$.subscribe((basket: Cart) => {
    this.basket$= basket;
    this.initQuantity();    
    });
  }
  
 
  minus(){
    
    if ( this.product ){
      
      this.basket$.getCartLines().forEach((line) => {

        if( this.product?.productId == line.getProductId() && line.getQuantity() > 0){           
            line.setQuantity(-1);
            this.quantity = line.getQuantity();      
           
            if (line.getQuantity()<=0){   
              this.basket$.removeLines(this.product?.productId);
              this.quantity =0;               
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

        if( this.product?.productId == line.getProductId()){ 
          //if ( line.getQuantity() < this.product.stock ){
            line.setQuantity(1);
            this.quantity = line.getQuantity();           
          //}          
          lineExist = true;
        }

      })
      if (!lineExist){              
        let cartLine = new CartLine(this.product?.productId | 0,this.product?.name,this.product?.price,1,1);
        this.basket$.addLines(cartLine);
        this.quantity = cartLine.getQuantity();       
      }
      
      this.basketService.updateBasket(this.basket$);
    }               
  }
  
  initQuantity(){
    
    if ( this.product ){

      if( (this.basket$.getCartLines().find(cart => cart.getProductId() == this.product?.productId )?.getQuantity()) == undefined){
        this.quantity=0 ;
      }

      this.basket$.getCartLines().forEach((line) => {
        
        if( this.product?.productId == line.getProductId()){      
            
            this.quantity= line.getQuantity(); 
                   
        }/*else{
          this.quantity = 0;
        }*/
       
      })
    }
  } 
  
}
