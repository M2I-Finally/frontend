import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { Product } from 'src/app/shared/entities/product';

//mockup data
let productList: Product[] = [
  {id: 1, name: 'Pain au chocolat', price: 3, isActive: true, qty:0},
  {id: 2, name: 'Croissant', price: 3, isActive: true, qty:0},
  {id: 3, name: 'Baguette', price: 1.5, isActive: true, qty:0},
  {id: 4, name: 'Pain au raison', price: 1, isActive: true, qty:0},
  {id: 5, name: 'Chausson au pomme', price: 2, isActive: true, qty:0},
  {id: 6, name: 'Brioche', price: 7, isActive: true, qty:0},
  {id: 7, name: 'Cookie', price: 2, isActive: true, qty:0}
];

@Component({
  selector: 'app-list-recap',
  templateUrl: './list-recap.component.html',
  styleUrls: ['./list-recap.component.scss'],
  standalone: true,
  imports: [MatTableModule],
})

export class ListRecapComponent {
  displayedColumns: string[] = ['Nom du produit', 'Quantité', 'PU', 'Total', 'delete'];
  dataSource = productList;

  minus(id:number){
    if (productList[id].qty > 0 ){
      productList[id].qty--;
      //function to add with cart
    }
  }

  add(id:number){
    productList[id].qty++;
    //function to add with cart
  }

  // totalCost : number = 

}
