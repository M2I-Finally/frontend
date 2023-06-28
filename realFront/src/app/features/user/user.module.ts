import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminProductsTableComponent } from './admin/admin-product-table/admin-product-table.component';
import { FormProductComponent } from './admin/admin-product-table/form-product/form-product.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    FormProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent
  ]
})
export class UserModule { }
