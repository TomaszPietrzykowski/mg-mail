import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // req.withCredentials = true; - won't work, since withCredentials is read only.
    // instead clone the req and pass cloned to next:
    const modifiedReq = req.clone({
      withCredentials: true,
    });
    return next.handle(modifiedReq);
  }
}
