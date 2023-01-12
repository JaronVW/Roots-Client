import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public isCollapsed = true;
  organization = {
    name: '',
    domain: '',
  };
  email: String = '';
  error: boolean = false;
  errorMessage: String = '';
  testOrganizationName: String = 'iHomer';
  testDomain: String = 'gmail.com';

  constructor() {
    /* TODO document why this constructor is empty */
  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

  createDomain() {
    this.organization.domain = this.email.split('@')[1];
  }

  validate() {
    if (this.testOrganizationName == this.organization.name) {
      this.setError(true, 'Deze organisatie bestaat al.');
      throw new Error('Deze organisatie bestaat al.');
    }
    if (this.organization.name == '') {
      this.setError(true, 'Organisatienaam kan niet leeg zijn.');
      throw new Error('Organisatienaam kan niet leeg zijn.');
    }
    if (this.testDomain == this.organization.domain) {
      this.setError(true, 'Dit domein bestaat al.');
      throw new Error('Dit domein bestaat al.');
    }
    if (this.organization.domain == '') {
      this.setError(true, 'Domein kan niet leeg zijn; voer uw email in.');
      throw new Error('Domein kan niet leeg zijn; voer uw email in.');
    }
    if (
      this.organization.name != '' &&
      this.testOrganizationName != this.organization.name &&
      this.organization.domain != '' &&
      this.testDomain != this.organization.domain
    ) {
      this.setError(false, '');
    }
  }

  setError(error: boolean, errorMessage: string) {
    this.error = error;
    this.errorMessage = errorMessage;
  }
}
