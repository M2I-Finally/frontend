import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../entities/category';
import { Observable } from 'rxjs';
import { Environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(Environment.apiUrl + '/categories');
  }

  postCategory(categoryName: string): Observable<Category> {
    return this.http.post<Category>(Environment.apiUrl + '/categories', { name: categoryName });
  }

  deleteCategory(categoryId: number): Observable<Category> {
    return this.http.delete<Category>(Environment.apiUrl + '/categories/' + categoryId, {});
  }

  patchCategoryStatus(categoryId: number): Observable<Category> {
    return this.http.patch<Category>(Environment.apiUrl + '/categories/status/' + categoryId, {});
  }

  patchCategoryName(categoryId: number, nameToSet: string): Observable<Category> {
    return this.http.patch<Category>(Environment.apiUrl + '/categories/name/' + categoryId, {
      name: nameToSet
    });
  }

}
