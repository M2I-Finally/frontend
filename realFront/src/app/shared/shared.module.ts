import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericButtonComponent } from './components/generic-button/generic-button.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';



@NgModule({
  declarations: [
    GenericButtonComponent,
    SearchBarComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GenericButtonComponent,
    SearchBarComponent,
    ProductCardComponent
  ]
})
export class SharedModule { }
