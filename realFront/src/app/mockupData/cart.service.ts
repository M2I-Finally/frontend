import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../shared/entities/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url = 'http://localhost:3000';
 
  constructor(private http: HttpClient) { }
  
  getProducts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.url + '/cart');
  }
}
