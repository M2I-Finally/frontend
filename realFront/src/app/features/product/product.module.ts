import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop/shop.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [  
    ShopComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    ShopComponent,
  ]
})
export class ProductModule { }
