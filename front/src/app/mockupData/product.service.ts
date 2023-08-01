import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../shared/entities/product';
import { Category } from '../shared/entities/category';
import { Environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(Environment.apiUrl + '/products');
  }

  // Temporary solution for json-server database mock-up
  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(Environment.apiUrl + '/products' +  productId);
  }

  postProduct(formData: FormData): Observable<Product> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept"
      })
    };

    return this.http.post<Product>(Environment.apiUrl + '/products', formData, httpOptions);
  }

  putProduct(productId: number, product: Product): Observable<Product> {
    return this.http.put<Product>(Environment.apiUrl + '/products/' + productId, product);
  }

  patchProductStatus(productId: number): Observable<Product> {
    return this.http.patch<Product>(Environment.apiUrl + '/products/' + productId, {});
  }

  deleteProduct(productId: number): Observable<Product> {
    return this.http.delete<Product>(Environment.apiUrl + '/products/' + productId);
  }

  //This is for search bar
  // searchProducts(searchValue:string):Observable<Product[]>{
  //   return this.http.get<Product[]>(
  //     `${this.url}/products?name_like=${searchValue}`
  //   );
  // }
}
