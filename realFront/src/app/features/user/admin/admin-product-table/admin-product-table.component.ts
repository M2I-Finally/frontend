import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/entities/product';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/mockupData/product.service';
import { Observable, Subscription, concat, first, mergeMap, switchMap, timer } from 'rxjs';

@Component({
  selector: 'admin-products-table',
  templateUrl: './admin-product-table.component.html',
  styleUrls: ['./admin-product-table.component.scss'],
})
export class AdminProductsTableComponent implements OnInit {

  constructor(private productService: ProductService) {}
  
  productList$:Observable<Product[]> | undefined;

  public ngOnInit(): void {
    // This will merge the new results even after page refresh
    this.productList$ =  this.productService.getProducts().pipe(
      mergeMap(() => this.productService.getProducts())
    );
  }

  protected deleteItem(tableIndex: number, productId: number): void {
    // This will subscribe to the only result returned from the observable (and thus unsubscribe)
    this.productList$ = this.productService.deleteProduct(productId).pipe(
      mergeMap(() => this.productService.getProducts())
    );
  }

}