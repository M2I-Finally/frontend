import { Component } from '@angular/core';

@Component({
  selector: 'facture',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent {

  currentDate: Date = new Date();
  price: number = 8.34;
  quantity: number = 3;
  price1: number = 1;
  quantity1: number = 3;
  total: number = 39.5;
  discount: number = 2;
  tva:number =5.5;

  close(){
    console.log(this.currentDate)
  }
}
