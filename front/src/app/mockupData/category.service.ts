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

  postCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.url + '/categories', category);
  }

  deleteCategory(categoryId: number): Observable<Category> {
    return this.http.delete<Category>(this.url + '/categories/' + categoryId);
  }

  putCategory(categoryId: number, category: Category): Observable<Category> {
    return this.http.put<Category>(this.url + '/categories/' + categoryId, category);
  }

}