import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminProductsTableComponent } from './admin/admin-product-table/admin-product-table.component';
import { LogoutComponent } from './logout/logout.component';
import { FormProductComponent } from './admin/admin-product-table/form-product/form-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { AdminUserTableComponent } from './admin/admin-user-table/admin-user-table.component';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    FormProductComponent,
    AdminProductsTableComponent,
    AdminUserTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule, 
    MatSlideToggleModule,
    RouterModule
  ],
  exports: [
    LoginComponent,
    LogoutComponent
  ]
})
export class UserModule { }
