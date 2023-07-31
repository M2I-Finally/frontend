import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/shared/services/product.service';
import { BasketService } from 'src/app/shared/services/basket.service';
import { Product } from 'src/app/shared/entities/product';
import { Cart } from 'src/app/shared/entities/cart';
import { CartLine } from 'src/app/shared/entities/cart-line';

@Component({
  selector: 'list-recap',
  templateUrl: './list-recap.component.html',
  styleUrls: ['./list-recap.component.scss']
})

export class ListRecapComponent implements OnInit {

  //voir Basket & Product-card

  @Input() product?: Product;
  @Input() quantity!: number;
  @Input() cartLine?: CartLine;

  total!: number;

  basket$!: Cart;
  cartLine$!: CartLine[];

  displayedColumns: string[] = ['Nom du produit', 'Quantité', 'PU', 'Discount', 'Total', 'delete'];
  productList$: Observable<Product[]> | undefined;
  productList: Product[] = [];


  constructor(private productService: ProductService, private basketService: BasketService) { };

  ngOnInit(): void {
    this.productList$ = this.productService.getProducts();
    this.productList$.subscribe(products => { this.productList = products });
    console.log(this.productList);

    this.basketService.basket$.subscribe((basket: Cart) => {
      this.basket$ = basket;
      console.log(basket);
      this.cartLine$ = basket.getCartLines();
      this.calculateTotal();
    });

  }

  minus(id: number) {
    this.basket$.getCartLines().forEach((line) => {
      if (line.getId() === id) {
        line.setQuantity(-1);
      }
    })
    this.basketService.updateBasket(this.basket$);
  }

  add(id: number) {
   
      this.basket$.getCartLines().forEach((line) => {
        if (line.getId() === id) {
          line.setQuantity(1);
        }
    })

    this.basketService.updateBasket(this.basket$);

  }

  calculateTotal(): void {
    let total = 0;
  
    this.cartLine$.forEach((cartLine) => {
      total += cartLine.getTotal();
    });
  
    this.total = total;
    this.basket$.setTotal(total);
  }

  removeItem(id:number){
      console.log("this is removeItem");
      this.basket$.removeLines(id);
      this.basketService.updateBasket(this.basket$);
      
  }
}
