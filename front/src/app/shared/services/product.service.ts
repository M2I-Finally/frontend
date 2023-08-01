import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Environment } from 'src/environment/environment';
import { Product } from '../entities/product';

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
    return this.http.get<Product>(Environment.apiUrl + '/products/' +  productId);
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

  putProduct(productId: number, formData: FormData): Observable<Product> {
    
    // Headers specified for image uploading
    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept"
      })
    };

    return this.http.put<Product>(Environment.apiUrl + '/products/' + productId, formData);
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
