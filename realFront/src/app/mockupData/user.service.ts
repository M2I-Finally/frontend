import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../shared/entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/users');
  }

  getUserById(userId: number | undefined): Observable<User> {
    return this.http.get<User>(this.url + '/users?id=' + userId)
      .pipe(
        map(res => {
          return res;
        })
      )
  }

  postUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + '/users', user);
  }

  putUser(userId: number, user: User): Observable<User> {
    return this.http.put<User>(this.url + '/users/' + userId, user);
  }

  deleteUser(userId: number | undefined): Observable<User> {
    return this.http.delete<User>(this.url + '/users/' + userId);
  }
}
