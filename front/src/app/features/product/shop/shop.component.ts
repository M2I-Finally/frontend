import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductService } from 'src/app/mockupData/product.service';
import { Cart } from 'src/app/shared/entities/cart';
import { Product } from 'src/app/shared/entities/product';
import { BasketService } from 'src/app/shared/services/basket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  constructor(private productService: ProductService, private basketService : BasketService, private router: Router) {}
  searchText="";
  products: Product[] = [];
  productList$: Observable<Product[]> | undefined;
  
  quantity: number = 0;
  basket$!: Cart;  

  ngOnInit(): void {
    this.basketService.basket$.subscribe((basket: Cart) => {
      this.basket$= basket;      
    });
    this.productList$ = this.productService.getProducts();
  } 

  goToPage(pageName:string): void {
    this.router.navigate([`${pageName}`])
  }
  
  onSearchTextEntered(searchValue:string){
    this.searchText = searchValue;
  }
}
