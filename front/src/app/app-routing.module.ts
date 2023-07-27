import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/user/login/login.component';


import { ListRecapComponent } from './features/payment/list-recap/list-recap.component';
import { AdminProductsTableComponent } from './features/user/admin/admin-product-table/admin-product-table.component';
import { ShopComponent } from './features/product/shop/shop.component';
import { GenericPaymentButtonComponent } from './shared/components/generic-payment-button/generic-payment-button.component';
import { LogoutComponent } from './features/user/logout/logout.component';
import { PaymentConfirmationPageComponent } from './features/payment/payment-confirmation-page/payment-confirmation-page.component';
import { FormProductComponent } from './features/user/admin/admin-product-table/form-product/form-product.component';
import { AdminUserTableComponent } from './features/user/admin/admin-user-table/admin-user-table.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path:"list-recap",
    component:ListRecapComponent
  },
  { 
    path:"products",
    component: AdminProductsTableComponent
  },
  { 
    path:'product-edit',
    component: FormProductComponent
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
  },
  {
    path:"payment-page",
    component:PaymentConfirmationPageComponent,
  },
  {
    path:"users",
    component:AdminUserTableComponent,
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
