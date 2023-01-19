import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = {
    username: '',
    password: '',
  };
  error: boolean = false;
  errorMessage: string = '';
  res: any;

  constructor(private authService: AuthService, private router: Router) {}

  validate() {
    if (this.user.password == '') {
      this.setError(true, 'Wachtwoord kan niet leeg zijn.');
    }
    if (
      !this.user.username.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      this.setError(true, 'Email moet valide zijn.');
    }
    if (
      this.user.username.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ) &&
      this.user.password != ''
    ) {
      this.authService.login(this.user).subscribe(
        (response) => {
          this.setError(false, '');
          this.res = response;
          const decoded: any = jwt_decode(this.res.access_token);
          localStorage.setItem('token', this.res.access_token);
          localStorage.setItem('email', decoded.username);
          this.router.navigate(['/events']);
        },
        (error) => {
          if (error.error.message == 'Account is inactive')
            this.setError(true, 'Uw account is inactief. Contacteer een ander werknemer als dit een fout is.');
          if (error.error.message == 'Invalid credentials')
            this.setError(true, 'Email/wachtwoord combinatie is incorrect.');
        },
      );
    }
  }

  setError(error: boolean, errorMessage: string) {
    this.error = error;
    this.errorMessage = errorMessage;
  }
}
