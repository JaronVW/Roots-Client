import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import {Observable, of} from 'rxjs';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  // public currentUser$ = new BehaviorSubject<UserInfo | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    // this.getUserFromLocalStorage()
    //   .pipe(
    //     switchMap((user: UserInfo | undefined) => {
    //       if (user) {
    //         console.log('User found in local storage working in intercept');
    //         // this.currentUser$.next(user);
    //         console.log('token: >' ,this.currentUser$.value?.token);
    //         // return this.validateToken(user);
    //         return of(user);
    //       } else {
    //         console.log(`No current user found`);
    //         return of(undefined);
    //       }
    //     })
    //   )
    //   .subscribe(() => console.log('Startup auth done'));

    console.log('reached the api interceptor');
    const newRequest = request.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': `${this.currentUser$.value?.token}`,
      }),
      url: `http://localhost:3000/${request.url}`
    });
    console.log('newRequest',newRequest);
    return next.handle(newRequest);
  }

  getUserFromLocalStorage(): Observable<null | undefined> {
    const userData = localStorage.getItem(this.CURRENT_USER);
    if (userData) {
      const localUser = JSON.parse(userData);
      return of(localUser);
    } else {
      return of(undefined);
    }
  }
}
