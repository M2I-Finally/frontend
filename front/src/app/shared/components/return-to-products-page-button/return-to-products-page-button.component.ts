import { Component,Input   } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'return-to-products-page-button',
  templateUrl: './return-to-products-page-button.component.html',
  styleUrls: ['./return-to-products-page-button.component.scss']
})
export class ReturnToProductsPageButtonComponent {
  @Input() back: string | undefined;
  constructor(private location: Location) { };

  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
