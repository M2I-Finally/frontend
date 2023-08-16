import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../../entities/product';
import { BasketService } from '../../services/basket.service';
import { BasketLine } from 'src/app/shared/entities/basket-line';
import { Basket } from '../../entities/basket';
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
  basket$!: Basket;  

  ngOnInit(): void {
    this.basketService.basket$.subscribe((basket: Basket) => {
    this.basket$= basket;
    this.initQuantity();    
    });
  }
  
 
  minus(){
    
    if ( this.product ){
      
      this.basket$.getBasketLines().forEach((line) => {

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
      this.basket$.getBasketLines().forEach((line) => {

        if( this.product?.productId == line.getProductId()){ 
          //if ( line.getQuantity() < this.product.stock ){
            line.setQuantity(1);
            this.quantity = line.getQuantity();           
          //}          
          lineExist = true;
        }

      })
      if (!lineExist){              
        let basketLine = new BasketLine(this.product?.productId | 0,this.product?.name,this.product?.price,1,1);
        this.basket$.addLines(basketLine);
        this.quantity = basketLine.getQuantity();       
      }
      
      this.basketService.updateBasket(this.basket$);
    }               
  }
  
  initQuantity(){
    
    if ( this.product ){

      if( (this.basket$.getBasketLines().find(basket => basket.getProductId() == this.product?.productId )?.getQuantity()) == undefined){
        this.quantity=0 ;
      }

      this.basket$.getBasketLines().forEach((line) => {
        
        if( this.product?.productId == line.getProductId()){      
            
            this.quantity= line.getQuantity(); 
                   
        }/*else{
          this.quantity = 0;
        }*/
       
      })
    }
  } 
  
}
