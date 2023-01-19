import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-accountrecovery',
  templateUrl: './accountrecovery.component.html',
  styleUrls: ['./accountrecovery.component.css'],
})
export class AccountrecoveryComponent {
  email: string = '';
  success: boolean = false;
  successMessage: string = '';
  error: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  sendResetPasswordRequest(email: string) {
    if (
      this.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      this.setError(false, '');
      this.setSuccess(true, 'Als dit email verbonden is aan een account is er een herstel email verstuurd!');
      this.authService.sendResetPasswordRequest(email);
    } else {
      this.setSuccess(false, '');
      this.setError(true, 'Email moet valide zijn.');
    }
  }

  setSuccess(success: boolean, successMessage: string) {
    this.success = success;
    this.successMessage = successMessage;
  }

  setError(error: boolean, errorMessage: string) {
    this.error = error;
    this.errorMessage = errorMessage;
  }
}
