import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { GenericButtonComponent } from './components/generic-button/generic-button.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { GenericHeaderComponent } from './components/generic-header/generic-header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BasketComponent } from './components/basket/basket.component';
import { BasketProductComponent } from './components/basket-product/basket-product.component';
import { GenericPaymentButtonComponent } from './components/generic-payment-button/generic-payment-button.component';
import { ReturnToProductsPageButtonComponent } from './components/return-to-products-page-button/return-to-products-page-button.component';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

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
    ReturnToProductsPageButtonComponent,
    AdminNavComponent,
  ],
 // providers: [BasketService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
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
    ReturnToProductsPageButtonComponent,
    AdminNavComponent,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: []
})
export class SharedModule { }

