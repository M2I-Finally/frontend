import { Component } from '@angular/core';
import { Product } from 'src/app/shared/entities/product';

@Component({
  selector: 'admin-products-table',
  templateUrl: './admin-product-table.component.html',
  styleUrls: ['./admin-product-table.component.scss']
})
export class AdminProductsTableComponent {

  productList: Product[] = [
    {id: 1, name: 'Pain au chocolat', price: 3, isActive: true},
    {id: 2, name: 'Croissant', price: 3, isActive: true},
    {id: 3, name: 'Baguette', price: 1.5, isActive: true},
    {id: 4, name: 'Pain au raison', price: 1, isActive: true},
    {id: 5, name: 'Chausson au pomme', price: 2, isActive: true},
    {id: 6, name: 'Brioche', price: 7, isActive: true},
    {id: 7, name: 'Cookie', price: 2, isActive: true}
  ];

  constructor() {}
}
