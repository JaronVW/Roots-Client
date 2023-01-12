import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public currentUser$ = new BehaviorSubject<null | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';

  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.post<User>(`auth/register`, user).subscribe();
  }
}
