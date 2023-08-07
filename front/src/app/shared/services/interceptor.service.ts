import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Jwt } from '../entities/jwt';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');
    
    let jwtDecoced : Jwt = jwt_decode(token!);
    const currentTimestamp = Math.floor(Date.now() / 1000);
  
    if(token && jwtDecoced.exp >= currentTimestamp){
      const httpOptions = {
        headers: new HttpHeaders({
          //"Access-Control-Allow-Origin" : "*",
          //"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
          "authorization" : `Bearer ${token}`      
        })
      };
      /*req = req.clone({        
        setHeaders: {
          Authorization: `Bearer ${token}`         
        },
      });*/      
      req = req.clone(httpOptions)      
    }else {
      sessionStorage.clear();
      this.router.navigate(['/']);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
         console.log("OMG une erreur 401 ou 403")
        }
       
        return throwError(() => new Error("dans le throws : "+error.message));
      })
    );

    
   
  }
}
