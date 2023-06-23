import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericButtonComponent } from './components/generic-button/generic-button.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { GenericHeaderComponent } from './components/generic-header/generic-header.component';



@NgModule({
  declarations: [
    GenericButtonComponent,
    SearchBarComponent,
    ProductCardComponent,
    GenericHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GenericButtonComponent,
    SearchBarComponent,
    ProductCardComponent,
    GenericHeaderComponent
  ]
})
export class SharedModule { }
