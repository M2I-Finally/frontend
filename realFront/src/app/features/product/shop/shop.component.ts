import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductService } from 'src/app/mockupData/product.service';
import { Cart } from 'src/app/shared/entities/cart';
import { Product } from 'src/app/shared/entities/product';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit{
  constructor(private productService: ProductService, private basketService : BasketService) {}
 
  productList$: Observable<Product[]> | undefined;
  
  quantity: number = 0;
  basket$!: Cart;
  
  

  ngOnInit(): void {
    this.basketService.basket$.subscribe((basket: Cart) => {
      this.basket$= basket;
      
    });
    this.productList$ = this.productService.getProducts();

    console.log(this.productList$.subscribe({
      next: (res) => {
        for (let index = 0; index < res.length; index++) {
         
          console.log(res[index])
        }},
      error: (err) => console.error(err)
    }))
    
  } 
 

}
