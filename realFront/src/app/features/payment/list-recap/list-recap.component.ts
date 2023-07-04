import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/mockupData/product.service';
import { Product } from 'src/app/shared/entities/product';

@Component({
  selector: 'list-recap',
  templateUrl: './list-recap.component.html',
  styleUrls: ['./list-recap.component.scss']
})

export class ListRecapComponent implements OnInit{

  //voir Basket & Product-card

  displayedColumns: string[] = ['Nom du produit', 'Quantité', 'PU', 'Total', 'delete'];
  productList$: Observable<Product[]> | undefined;
  productList: Product[] = [];

  constructor(private productService: ProductService){};

  ngOnInit(): void {
    this.productList$ = this.productService.getProducts();
    this.productList$.subscribe(products => { this.productList = products});
    console.log(this.productList);
  }

  minus(id: number){
    if (this.productList[id].stock > 0) {
      this.productList[id].stock--;
      //function to add with cart
    }
  }

  add(id: number){
    this.productList[id].stock++;
    //function to add with cart
  }
}
