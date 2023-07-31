
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private isLogged = false;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    this.logout();
    console.log(username + " " + password);
    const loginUrl = 'https://dummyjson.com/auth/login';

    return this.http.post<any>(loginUrl, { username, password })
      .pipe(
        map(response => {
          if (response && response.token) {
            // Le backend a renvoyé un token JWT valide, nous considérons l'utilisateur comme connecté.
            localStorage.setItem('token', response.token); 
            //this.isLogged = true;
            console.log("token dans localstorage")
            return true;
          } else {
            console.log("erreur d'authentification")
            //this.isLogged = false;
            return false;
          }
        })
      );
  }

  logout(): void {
   
    localStorage.removeItem('token'); 
    //this.isLogged = false;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}