import { Injectable } from '@angular/core';
import { Payment } from '../entities/payment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  
  url = 'http://localhost:8080/payment';
 
  constructor(private http: HttpClient) { }
  
  postPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.url, payment);
  }
  
}
