import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private count: number = 0;

  constructor( private router: Router, private loader:LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loader.show();
    this.count++;

      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      }); 

    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
        if(err instanceof HttpErrorResponse) {
          //Handle Error
        }
        return throwError(err);
      }),
      finalize(() => {
        this.count--;
        if(this.count === 0){
          this.loader.hide();
        }
      })
    )
  }

}