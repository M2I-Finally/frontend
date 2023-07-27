import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRecapComponent } from './list-recap/list-recap.component';
import { PaymentConfirmationPageComponent } from './payment-confirmation-page/payment-confirmation-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    PaymentConfirmationPageComponent,
    ListRecapComponent
  
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule
  ],
  exports: [
    ListRecapComponent,
    PaymentConfirmationPageComponent
    
  ]
})
export class PaymentModule { }
