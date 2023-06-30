import { Component, Input } from '@angular/core';
import { Product } from '../../entities/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: Product | undefined;
  // name: string | undefined;
  // price: number | undefined;
  // qty = 0;

  minus(){
    // if (this.product.qty>0){
      // this.product.qty--;
      // function to add with cart
    // }
  }

  add(){
    // this.qty++;
    // function to add with cart
  }
}
