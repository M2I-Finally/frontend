import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericButtonComponent } from './components/generic-button/generic-button.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';



@NgModule({
  declarations: [
    GenericButtonComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
