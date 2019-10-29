import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: ErrorEvent | HttpErrorResponse) => {
          console.log(error);
          if (error instanceof HttpErrorResponse) {
            // Server error happened
            if (!navigator.onLine) {
              console.log('ERROR - INTERNET ISSUES', error);
              return throwError('No Internet Connection');
            }
            // Http Error
            // Send the error to the server
            console.log('ERROR - HTTP ISSUES', error);
            return throwError(error.error.message);
          } else {
            // Client Error Happend
            console.log('ERROR - CLIENT ISSUES', error);
            return throwError(error.message);
          }
        })
      );
  }
}
