import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUserToken = JSON.parse(localStorage.getItem('currentUserToken'));
    if (currentUserToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `${currentUserToken}`
        }
      });
    }
    return next.handle(request);
  }
}
