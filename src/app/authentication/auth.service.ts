import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginUser, RegisterUser } from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<null | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';

  constructor(private http: HttpClient) {}

  login(user: LoginUser) {
    return this.http.post(`auth/login`, user);
  }

  register(user: RegisterUser) {
    return this.http.post(`auth/register`, user);
  }
}
