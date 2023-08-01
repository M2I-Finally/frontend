import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../entities/product';
import { TemporaryGetByIdProductResult } from '../../mockupData/temporary-get-by-id-product-result';
import { Category } from '../entities/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:8080/products';
 
  constructor(private http: HttpClient) { }
  
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  // Temporary solution for json-server database mock-up
  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(this.url + '/' +  productId);
  }
  
  getProductByCategoryId(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/category/' +  categoryId);
  }

  postProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }

  putProduct(productId: number, product: Product): Observable<Product> {
    return this.http.put<Product>(this.url + '/' + productId, product);
  }

  patchProductStatus(productId: number): Observable<Product> {
    return this.http.patch<Product>(this.url + '/' + productId, {});
  }

  deleteProduct(productId: number): Observable<Product> {
    return this.http.delete<Product>(this.url + '/' + productId);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + '/categories');
  }
  
  //This is for search bar
  searchProducts(searchValue:string):Observable<Product[]>{
    return this.http.get<Product[]>(
      `${this.url}/products?name_like=${searchValue}`
    );
  }
}
