import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse } from '@angular/common/http';
import { AuthService } from '../views/login/auth.service';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    let authService = this.injector.get(AuthService)
    console.log('interceptor')
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: authService.getToken()
      }
    })
    console.log(tokenizedReq)
    return next.handle(tokenizedReq)
      .pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log(event.status);
        }
      }));
  }

}
