import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VerifyaccountService {
  constructor(private httpClient: HttpClient) {}

  verifyAccount(token: string) {
    return this.httpClient.patch<{ message: string }>(`auth/verify/${token}`, {});
  }
}
