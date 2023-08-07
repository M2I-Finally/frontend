
import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class Auth {
  private customHttpClient: HttpClient;

  constructor(private backend: HttpBackend) { 
    this.customHttpClient = new HttpClient(backend)
  }
  
  login(username: string, password: string): Observable<boolean> {
    this.logout();    
    const loginUrl = 'http://localhost:8080/login';

    return this.customHttpClient.post<any>(loginUrl, { username, password })
      .pipe(
        map(response => {
          if (response && response.token) {            
            sessionStorage.setItem('token', response.token);  
           
            return true;
          } else {
                       
            return false;
          }
        })
      );
  }

  logout(): void {   
    sessionStorage.removeItem('token');     
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem("token");
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
}