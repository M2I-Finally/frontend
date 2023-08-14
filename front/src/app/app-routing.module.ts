import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/user/login/login.component';


import { AdminProductsTableComponent } from './features/user/admin/admin-product-table/admin-product-table.component';
import { ShopComponent } from './features/product/shop/shop.component';
import { GenericPaymentButtonComponent } from './shared/components/generic-payment-button/generic-payment-button.component';
import { LogoutComponent } from './features/user/logout/logout.component';
import { PaymentConfirmationPageComponent } from './features/payment/payment-confirmation-page/payment-confirmation-page.component';
import { FormProductComponent } from './features/user/admin/admin-product-table/form-product/form-product.component';
import { AdminUserTableComponent } from './features/user/admin/admin-user-table/admin-user-table.component';

import { GuardService } from './shared/services/guard.service';

import { AdminCategoryTableComponent } from './features/user/admin/admin-category-table/admin-category-table.component';
import { PagenotfoundComponent } from './features/pagenotfound/pagenotfound.component';
import { InvoiceComponent} from './features/payment/invoice/invoice.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  { 
    path:"products",
    component: AdminProductsTableComponent,
    canActivate: [GuardService]
  },
  { 
    path:'product-edit',
    component: FormProductComponent,
    canActivate: [GuardService]
  },
  {
    path:"shop",
    component: ShopComponent,
    canActivate: [GuardService]
  },
  {
    path:"facture",
    component:InvoiceComponent
    //canActivate: [GuardService]
  },
  {
    path:"logout",
    component:LogoutComponent,
  },
  {
    path:"payment-page",
    component:PaymentConfirmationPageComponent,
    canActivate: [GuardService]
  },
  {
    path:"users",
    component:AdminUserTableComponent,
    canActivate: [GuardService]
  },
  {
    path:"categories",
    component: AdminCategoryTableComponent,
    canActivate: [GuardService]
  },
  {
    path: '**', 
    pathMatch: 'full', 
    component: PagenotfoundComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

