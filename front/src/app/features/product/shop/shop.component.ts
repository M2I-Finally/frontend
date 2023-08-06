import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { Cart } from 'src/app/shared/entities/cart';
import { Product } from 'src/app/shared/entities/product';
import { BasketService } from 'src/app/shared/services/basket.service';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { Jwt } from 'src/app/shared/entities/jwt';

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
  selectedCategoryId: number | undefined;
  filteredProductList$: Observable<Product[]> | undefined;
  userRole: string = 'USER';
  classToUse: string = 'groupleft';
  
  quantity: number = 0;
  basket$!: Cart;  

  ngOnInit(): void {
    this.basketService.basket$.subscribe((basket: Cart) => {
      this.basket$= basket;      
    });
    this.productList$ = this.productService.getProducts();
    
    let sessionToken = sessionStorage.getItem('token');
    let decoded: Jwt = jwt_decode(sessionToken!);
    this.userRole = decoded.role;
    if ( this.userRole == 'USER' ) {
      this.classToUse = 'groupleft-user';
    }
  } 

  /**
   * go to given page
   * @param pageName given page
   */
  goToPage(pageName:string): void {
    this.router.navigate([`${pageName}`])
  }
  
  /**
   * search product
   * @param searchValue 
   */
  onSearchTextEntered(searchValue:string){
    this.searchText = searchValue.toLowerCase();
  }

  /**
   * filter category
   * @param event 
   */
  categoryFilter(event: number): void {
    this.selectedCategoryId = event;
    this.productList$ = this.productService.getProductByCategoryId(this.selectedCategoryId);
  }

  /**
   * delete the filter and display all products
   */
  deleteFilter(): void {
    this.productList$ = this.productService.getProducts();
  }

}
