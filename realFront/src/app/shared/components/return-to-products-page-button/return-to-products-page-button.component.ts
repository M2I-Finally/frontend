import { Component,Input } from '@angular/core';

@Component({
  selector: 'return-to-products-page-button',
  templateUrl: './return-to-products-page-button.component.html',
  styleUrls: ['./return-to-products-page-button.component.scss']
})
export class ReturnToProductsPageButtonComponent {
  @Input() back: string | undefined;
}
