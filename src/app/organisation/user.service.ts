import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public currentUser$ = new BehaviorSubject<null | undefined>(undefined);

  constructor(private http: HttpClient) {}

  setActive(id: number) {
    return this.http.patch(`users/setActive/${id}`, {});
  }

  setInactive(id: number) {
    return this.http.patch(`users/setInactive/${id}`, {});
  }

  getAll() {
    return this.http.get(`users`);
  }
}
