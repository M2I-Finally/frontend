import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GenericButtonComponent } from './components/generic-button/generic-button.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { GenericHeaderComponent } from './components/generic-header/generic-header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BasketComponent } from './components/basket/basket.component';
import { BasketProductComponent } from './components/basket-product/basket-product.component';
import { GenericPaymentButtonComponent } from './components/generic-payment-button/generic-payment-button.component';
import { Router } from '@angular/router';
import { ReturnToProductsPageButtonComponent } from './components/return-to-products-page-button/return-to-products-page-button.component';


@NgModule({
  declarations: [
    GenericButtonComponent,
    SearchBarComponent,
    ProductCardComponent,
    GenericHeaderComponent,
    NavigationComponent,
    BasketComponent,
    BasketProductComponent,
    GenericPaymentButtonComponent,
    ReturnToProductsPageButtonComponent
  ],
 // providers: [BasketService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    GenericButtonComponent,
    SearchBarComponent,
    ReactiveFormsModule,
    ProductCardComponent,
    GenericHeaderComponent,    
    NavigationComponent,
    BasketComponent,
    BasketProductComponent,
    GenericPaymentButtonComponent,
    ReturnToProductsPageButtonComponent
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'fr' // 'de' for Germany, 'fr' for France ...
   }]
})
export class SharedModule { }
