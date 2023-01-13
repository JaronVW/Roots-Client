import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  helper = new JwtHelperService();
  token = localStorage.getItem('jwt');
  isExpired = this.helper.isTokenExpired(this.token);

  constructor(public router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('token');
    if (token) {
      if (this.helper.isTokenExpired(token)) {
        localStorage.setItem('token', '');
        localStorage.setItem('email', '');
        this.router.navigate(['/login']);
      }
    } else {
      localStorage.setItem('token', '');
      localStorage.setItem('email', '');
      this.router.navigate(['/login']);
    }

    const newRequest = request.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      url: `http://localhost:3000/${request.url}`,
    });
    return next.handle(newRequest);
  }
}
