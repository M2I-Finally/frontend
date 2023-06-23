import { Component } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  qty = 0;

  minus(){
    if (this.qty>0){
      this.qty--;
      //function to add with cart
    }
  }

  add(){
    this.qty++;
    //function to add with cart
  }
}
