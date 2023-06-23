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
    {productId: 1, productName: 'Pain au chocolat', price: 3, isActive: true},
    {productId: 2, productName: 'Croissant', price: 3, isActive: true},
    {productId: 3, productName: 'Baguette', price: 1.5, isActive: true},
    {productId: 4, productName: 'Pain au raison', price: 1, isActive: true},
    {productId: 5, productName: 'Chausson au pomme', price: 2, isActive: true},
    {productId: 6, productName: 'Brioche', price: 7, isActive: true},
    {productId: 7, productName: 'Cookie', price: 2, isActive: true}
  ];

  constructor() {}

  public updateItem(id: number): void {
    console.log("Redirection to item editing... ID : " + id)
  }

  public deleteItem(id: number): void {
    console.log("Deleted item number " + id);
    this.productList.splice(id - 1, 1);
  }
}
