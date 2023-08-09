import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/environment/environment';
import { TodaySaleDto } from '../entities/today-sale-dto';
import { Jwt } from '../entities/jwt';
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class TodaySaleService {

  url = Environment.apiUrl + '/today-sale/';
  sellerId : number = 0;
  constructor(private http: HttpClient) { }
  
  

  getTodaySale(): Observable<TodaySaleDto> {
    const sessionToken = sessionStorage.getItem('token');
    let decoded: Jwt = jwt_decode(sessionToken!);
    this.sellerId = decoded.id;
    console.log(this.url+this.sellerId);
    return this.http.get<TodaySaleDto>(this.url+this.sellerId);
  }
}
