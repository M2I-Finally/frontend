import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Dans l'interceptor")
    console.log(req)
    const token = sessionStorage.getItem('token');
    
    if(token){
      const httpOptions = {
        headers: new HttpHeaders({
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
          "authorization" : `Bearer ${token}`,
          "banane" : "fruit"
        })
      };
      req = req.clone({
        
        setHeaders: {
          Authorization: `Bearer ${token}`,
         
        },
      });
      /*req.headers.append("access-Control-Allow-Origin","*")
      req.headers.append("access-Control-Allow-Headers" , "Origin, X-Requested-With, Content-Type, Accept")
      req.headers.append("authorization" , `Bearer ${token}`)*/
      req = req.clone(httpOptions)
      console.log("Dans le if de modif headers")
     console.log(req)
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
         console.log("OMG une erreur 401 ou 403")
        }

        return throwError(() => new Error(error.message));
      })
    );

    
   
  }
}
