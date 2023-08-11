import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Jwt } from '../entities/jwt';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');
    
    let jwtDecoded : Jwt = jwt_decode(token!);
    const currentRole = jwtDecoded.role;
    const currentUrl = this.router.url;

    // if(currentUrl == "/users" && currentRole != "ADMIN") {
    //   this.router.navigate(['/']);
    // } 
    
    // if((currentUrl == "/categories" || currentUrl == "/products") && currentRole == "EMPLOYEE") {
    //   this.router.navigate(['/']);
    // }
    
    const currentTimestamp = Math.floor(Date.now() / 1000);
  
    if(token && jwtDecoded.exp >= currentTimestamp){
      const httpOptions = {
        headers: new HttpHeaders({
          "Authorization" : `Bearer ${token}`      
        })
      };
      req = req.clone(httpOptions)      

    } else {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.router.navigate(['/']);       
        }
        return throwError(() => new Error("Unexpected error : "+error.message));
      })
    );
  }
}
