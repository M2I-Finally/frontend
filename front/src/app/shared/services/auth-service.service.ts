
import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private customHttpClient: HttpClient;
  private isLogged = false;

  constructor(private backend: HttpBackend) { 
    this.customHttpClient = new HttpClient(backend)
  }
  
  login(username: string, password: string): Observable<boolean> {
    this.logout();
    console.log(username + " " + password);
    const loginUrl = 'http://localhost:8080/login';

    return this.customHttpClient.post<any>(loginUrl, { username, password })
      .pipe(
        map(response => {
          if (response && response.token) {
            // Le backend a renvoyé un token JWT valide, nous considérons l'utilisateur comme connecté.
            sessionStorage.setItem('token', response.token); 
            this.isLogged = true;
            console.log("token dans localstorage")
            return true;
          } else {
            console.log("erreur d'authentification")
            this.isLogged = false;
            return false;
          }
        })
      );
  }

  logout(): void {
   
    sessionStorage.removeItem('token'); 
    //this.isLogged = false;
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem("token");
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
}