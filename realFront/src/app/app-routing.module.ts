import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericButtonComponent } from './shared/components/generic-button/generic-button.component';
import { LoginComponent } from './features/user/login/login.component';
import { GenericHeaderComponent } from './shared/components/generic-header/generic-header.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';

import { ListRecapComponent } from './features/payment/list-recap/list-recap.component';
import { AdminProductsTableComponent } from './features/user/admin/admin-product-table/admin-product-table.component';
import { ShopComponent } from './features/product/shop/shop.component';
import { GenericPaymentButtonComponent } from './shared/components/generic-payment-button/generic-payment-button.component';
import { LogoutComponent } from './features/user/logout/logout.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'button',
    component: GenericButtonComponent,
  },
  {
    path:"list-recap",
    component:ListRecapComponent
  },
  {
    path:"table",
    component: AdminProductsTableComponent
  },
  {
    path:"shop",
    component: ShopComponent,
  },
  {
    path:"payment-button",
    component:GenericPaymentButtonComponent,
  },
  {
    path:"logout",
    component:LogoutComponent,
  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
