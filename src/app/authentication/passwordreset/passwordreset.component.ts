import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css'],
})
export class PasswordresetComponent implements OnInit {
  password: string = '';
  repeatPassword: string = '';
  error: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router,) {}

  ngOnInit(): void {}

  resetPassword(password: string, repeatPassword: string) {
    if (this.repeatPassword != this.password) {
      this.setError(true, 'Wachtwoorden komen niet overeen.');
    }
    if (this.password.length < 8 || this.password.length > 20) {
      this.setError(true, 'Wachtwoord moet tussen de 8-20 tekens lang zijn.');
    }
    if (this.password.length > 7 && this.password.length < 21 && this.password == this.repeatPassword) {
      this.setError(false, '')
      this.authService.resetPassword(this.route.snapshot.paramMap.get('id')!, this.password);
      this.router.navigate(['/login']);
    }
  }

  setError(error: boolean, errorMessage: string) {
    this.error = error;
    this.errorMessage = errorMessage;
  }
}
