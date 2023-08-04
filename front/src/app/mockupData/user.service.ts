import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../shared/entities/user';
import { Environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = Environment.apiUrl + '/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUserById(userId: number | undefined): Observable<User> {
    return this.http.get<User>(this.url + '/' + userId)
      .pipe(
        map(res => {
          return res;
        })
      )
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  putUser(userId: number | undefined, user: User): Observable<User> {
    return this.http.put<User>(this.url + '/' + userId, user);
  }

  deleteUser(userId: number | undefined): Observable<User> {
    return this.http.delete<User>(this.url + '/' + userId);
  }
}
