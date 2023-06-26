import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/entities/product';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/mockupData/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'admin-products-table',
  templateUrl: './admin-product-table.component.html',
  styleUrls: ['./admin-product-table.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSlideToggleModule],
})
export class AdminProductsTableComponent implements OnInit {

  // productList: Product[] = [
  //   {id: 1, name: 'Pain au chocolat', price: 3, isActive: true, qty:0},
  //   {id: 2, name: 'Croissant', price: 3, isActive: true, qty:0},
  //   {id: 3, name: 'Baguette', price: 1.5, isActive: true, qty:0},
  //   {id: 4, name: 'Pain au raison', price: 1, isActive: true, qty:0},
  //   {id: 5, name: 'Chausson au pomme', price: 2, isActive: true, qty:0},
  //   {id: 6, name: 'Brioche', price: 7, isActive: true, qty:0},
  //   {id: 7, name: 'Cookie', price: 2, isActive: true, qty:0}
  // ];

  constructor( private productService: ProductService) {}
  productList$:Observable<Product[]> | undefined;
  productList: Product[] = [];

  ngOnInit(): void {
    this.productList$ = this.productService.getProducts();
    this.productList$.subscribe(products => { this.productList = products});
    console.log(this.productList);

  }
  public updateItem(id: number): void {
    console.log("Redirection to item editing... ID : " + this.productList[id].id)
  }

  public deleteItem(id: number): void {
    console.log("Deleted item number " + this.productList[id].id);
  }
}
