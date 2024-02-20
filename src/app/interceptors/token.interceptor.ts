import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private toast : NgToastService, private rout : Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();

    if (myToken){
      request = request.clone({
        setHeaders: {Authorization:`Bearer ${myToken}`}
      })
    }
    return next.handle(request).pipe(catchError((err:any) =>{
      if (err instanceof HttpErrorResponse){
        if (err.status == 401){
          this.toast.warning({detail:"warrning",summary: "token is expired , login again", duration: 5000});
          this.rout.navigate(['login']).then(() => {
            console.log('Navigation to login is complete!');
          });

        }

      }0
      return throwError(()=> new Error("Some other error Occurred"))
    })
    );


  }
}
