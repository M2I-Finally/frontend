import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../shared/entities/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + '/categories');
  }
}
