import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminProductsTableComponent } from './admin/admin-product-table/admin-product-table.component';
import { FormProductComponent } from './admin/admin-product-table/form-product/form-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';



@NgModule({
  declarations: [
    LoginComponent,
    FormProductComponent,
    AdminProductsTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule, 
    MatSlideToggleModule
  ],
  exports: [
    LoginComponent,
  ]
})
export class UserModule { }
