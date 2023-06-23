import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-list-recap',
  templateUrl: './list-recap.component.html',
  styleUrls: ['./list-recap.component.scss']
})
export class ListRecapComponent {
   productList: Product[] = [
    {productId: 1, productName: 'Pain au chocolat', price: 3},
    {productId: 2, productName: 'Croissant', price: 3},
    {productId: 3, productName: 'Baguette', price: 1.5},
    {productId: 4, productName: 'Pain au raison', price: 1},
    {productId: 5, productName: 'Chausson au pomme', price: 2},
    {productId: 6, productName: 'Brioche', price: 7},
    {productId: 7, productName: 'Cookie', price: 2}
  ];
  
}
