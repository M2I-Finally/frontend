import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../shared/entities/product';
import { Category } from '../shared/entities/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:3000';
 
  constructor(private http: HttpClient) { }
  
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/products');
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + '/categories');
  }
}
