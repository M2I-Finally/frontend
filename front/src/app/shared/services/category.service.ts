import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../entities/category';
import { Observable } from 'rxjs';
import { CreateCategory } from '../entities/create-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + '/categories/all');
  }

  postCategory(categoryToCreate: CreateCategory): Observable<Category> {
    return this.http.post<Category>(this.url + '/categories', categoryToCreate);
  }

  deleteCategory(categoryId: number): Observable<Category> {
    return this.http.delete<Category>(this.url + '/categories/' + categoryId);
  }

  patchCategoryStatus(categoryId: number): Observable<Category> {
    return this.http.patch<Category>(this.url + '/categories/status/' + categoryId, {});
  }

  patchCategoryName(categoryId: number, nameToSet: string): Observable<Category> {
    return this.http.patch<Category>(this.url + '/categories/name/' + categoryId, {
      name: nameToSet
    });
  }

}
