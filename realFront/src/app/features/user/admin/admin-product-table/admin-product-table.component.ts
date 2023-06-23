import { Component } from '@angular/core';
import { Product } from 'src/app/shared/entities/product';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-products-table',
  templateUrl: './admin-product-table.component.html',
  styleUrls: ['./admin-product-table.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSlideToggleModule],
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

  public updateItem(id: number): void {
    console.log("Redirection to item editing... ID : " + id)
  }

  public deleteItem(id: number): void {
    console.log("Deleted item number " + id);
  }
}
