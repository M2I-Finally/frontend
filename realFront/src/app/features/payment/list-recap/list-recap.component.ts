import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Product } from 'src/app/shared/entities/product';

//mockup data
let productList: Product[] = [
  {productId: 1, productName: 'Pain au chocolat', price: 3, isActive: true},
  {productId: 2, productName: 'Croissant', price: 3, isActive: true},
  {productId: 3, productName: 'Baguette', price: 1.5, isActive: true},
  {productId: 4, productName: 'Pain au raison', price: 1, isActive: true},
  {productId: 5, productName: 'Chausson au pomme', price: 2, isActive: true},
  {productId: 6, productName: 'Brioche', price: 7, isActive: true},
  {productId: 7, productName: 'Cookie', price: 2, isActive: true}
];

@Component({
  selector: 'app-list-recap',
  templateUrl: './list-recap.component.html',
  styleUrls: ['./list-recap.component.scss'],
  standalone: true,
  imports: [MatTableModule],
})

export class ListRecapComponent {

  displayedColumns: string[] = ['Nom du produit', 'Quantité', 'PU', 'Total', 'delete'];
  dataSource = productList;
}
