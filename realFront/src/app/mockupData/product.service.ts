import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../shared/entities/product';
import { TemporaryGetByIdProductResult } from './temporary-get-by-id-product-result';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:3000';
 
  constructor(private http: HttpClient) { }
  
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/products');
  }

  // Temporary solution for json-server database mock-up
  getProductById(productId: number): Observable<Product> {
    return this.http.get<TemporaryGetByIdProductResult>(this.url + '/products?id=' + productId)
    .pipe(
      map(res => {
          return res['0'];
      })
    );
  }

  postProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url + '/products', product);
  }

  deleteProduct(productId: number): Observable<Product> {
    return this.http.delete<Product>(this.url + '/products/' + productId);
  }
}
