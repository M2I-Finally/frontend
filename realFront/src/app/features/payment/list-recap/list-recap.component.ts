import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from 'src/app/mockupData/product.service';
import { Product } from 'src/app/shared/entities/product';

@Component({
  selector: 'app-list-recap',
  templateUrl: './list-recap.component.html',
  styleUrls: ['./list-recap.component.scss'],
  standalone: true,
  imports: [MatTableModule],
})

export class ListRecapComponent implements OnInit{
  displayedColumns: string[] = ['Nom du produit', 'Quantité', 'PU', 'Total', 'delete'];
  productList$:Observable<Product[]> | undefined;
  productList: Product[] = [];

  constructor(private productService: ProductService){};

  ngOnInit(): void {
    this.productList$ = this.productService.getProducts();
    this.productList$.subscribe(products => { this.productList = products});
    console.log(this.productList);
  }

  minus(id: number){
    if (this.productList[id].quantity > 0) {
      this.productList[id].quantity--;
      //function to add with cart
    }
  }

  add(id: number){
    this.productList[id].quantity++;
    //function to add with cart
  }
}
