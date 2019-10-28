import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  private bearer = 'Bearer';
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // bail if we're not requesting something against our api
    const apiReq = req.url.startsWith(environment.baseUrl);
    if (!apiReq) { return next.handle(req); }

    // bail if we don't have a token in the first place
    const token = localStorage.getItem('token');
    if (!token) { return next.handle(req); }

     // otherwise, attach the auth token and make the request
    const jsonReq: HttpRequest<any> = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `${this.bearer} ${token}`
      }
    });

    return next.handle(jsonReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {}
      })
    );
  }
}
