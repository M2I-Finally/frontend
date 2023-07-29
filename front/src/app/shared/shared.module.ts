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
import { MessageNotificationComponent } from './components/message-notification/message-notification.component';
import { NotificationStatusEnum } from './components/message-notification/notification-status-enum';


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
    MessageNotificationComponent,
  ],
 // providers: [BasketService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
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
    MessageNotificationComponent
  ],
  providers: []
})
export class SharedModule { }

