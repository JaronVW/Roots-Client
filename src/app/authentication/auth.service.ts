import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginUser, RegisterUser } from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<null | undefined>(undefined);

  constructor(private http: HttpClient) {}

  login(user: LoginUser) {
    return this.http.post(`auth/login`, user);
  }

  register(user: RegisterUser) {
    return this.http.post(`auth/register`, user);
  }

  sendResetPasswordRequest(email: string) {
    return this.http.post(`auth/reset-password`, { email }).subscribe();
  }

  resetPassword(id: string, password: string) {
    return this.http.post(`auth/reset-password/${id}`, { password }).subscribe();
  }
}
