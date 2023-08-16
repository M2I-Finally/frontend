import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../entities/user';
import { Environment } from 'src/environment/environment';
import { UserDto } from '../entities/user-dto';

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

  getUserByUsername(userName: string): Observable<User> {
    return this.http.get<User>(this.url + '/username/' + userName);
  }

  postUser(user: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.url, user);
  }

  putUser(userId: number, user: User): Observable<User> {
    return this.http.put<User>(this.url + '/' + userId, user);
  }

  patchUserStatus(userId: number): Observable<UserDto> {
    return this.http.patch<UserDto>(this.url + '/' + userId, {});
  }

  checkPassword(userId: number, password: string): Observable<boolean> {
    return this.http.post<boolean>(this.url + '/check', {userId, password})
  }
}
