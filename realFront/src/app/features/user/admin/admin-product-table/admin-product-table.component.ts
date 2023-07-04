import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/entities/product';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/mockupData/product.service';
import { Observable, first, take } from 'rxjs';

@Component({
  selector: 'admin-products-table',
  templateUrl: './admin-product-table.component.html',
  styleUrls: ['./admin-product-table.component.scss'],
})
export class AdminProductsTableComponent implements OnInit {

  constructor(private productService: ProductService) {}
  productList$:Observable<Product[]> | undefined;
  productList: Product[] = [];

  ngOnInit(): void {
    this.productList$ = this.productService.getProducts();
    this.productList$.subscribe(products => { this.productList = products});
  }

  protected deleteItem(tableIndex: number, productId: number): void {
    // This will subscribe to the only result returned from the observable (and thus unsubscribe)
    this.productService.deleteProduct(productId).pipe(first()).subscribe(data => console.log(data));
    this.productList.splice(tableIndex, 1)
  }
}