import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/entities/product';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/mockupData/product.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-products-table',
  templateUrl: './admin-product-table.component.html',
  styleUrls: ['./admin-product-table.component.scss'],
})
export class AdminProductsTableComponent implements OnInit {

  constructor(private router: Router, private productService: ProductService) {}
  productList$:Observable<Product[]> | undefined;
  productList: Product[] = [];

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.productList$ = this.productService.getProducts();
    this.productList$.subscribe(products => { this.productList = products});
  }

  public deleteItem(id: number): void {
    console.log("Deleted item number " + id);
    this.productList.splice(id - 1, 1);
  }
}