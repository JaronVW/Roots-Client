import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  helper = new JwtHelperService();
  token = localStorage.getItem('jwt');
  isExpired = this.helper.isTokenExpired(this.token);

  constructor(public router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (
      this.router.url !== '/login' &&
      this.router.url !== '/register' &&
      this.router.url !== '/accountrecovery' &&
      !this.router.url.includes('/verifyaccount')
    ) {
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
    }

    const newRequest = request.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      url: `${environment.apiUrl}${request.url}`,
    });
    return next.handle(newRequest);
  }
}
