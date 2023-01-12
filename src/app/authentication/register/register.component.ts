import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public isCollapsed = false;
  organization = {
    name: '',
    domain: '',
  };
  user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  };
  repeatpassword: String = '';
  userError: boolean = false;
  userErrorMessage: String = '';
  organizationError: boolean = false;
  organizationErrorMessage: String = '';
  testOrganizationName: String = 'iHomer';
  testDomain: String = 'gmail.com';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

  createDomain() {
    this.organization.domain = this.user.username.split('@')[1];
  }

  validateUser() {
    if (this.repeatpassword != this.user.password) {
      this.setUserError(true, 'Wachtwoorden komen niet overeen.');
    }
    if (this.user.password.length < 8 || this.user.password.length > 20) {
      this.setUserError(true, 'Wachtwoord moet tussen de 8-20 tekens lang zijn.');
    }
    if (this.user.password == '') {
      this.setUserError(true, 'Wachtwoord kan niet leeg zijn.');
    }
    if (!this.user.username.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      this.setUserError(true, 'Email moet valide zijn.');
    }
    if (this.user.lastName == '') {
      this.setUserError(true, 'Achternaam kan niet leeg zijn.');
    }
    if (this.user.firstName == '') {
      this.setUserError(true, 'Voornaam kan niet leeg zijn.');
    }
    if (
      this.user.firstName != '' &&
      this.user.lastName != '' &&
      this.user.username.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) &&
      this.user.password != '' &&
      this.user.password.length > 7 &&
      this.user.password.length < 21 &&
      this.user.password == this.repeatpassword
    ) {
      this.setUserError(false, '');
      this.userService.register(this.user);
    }
  }

  validateOrganization() {
    if (this.testOrganizationName == this.organization.name) {
      this.setOrganizationError(true, 'Deze organisatie bestaat al.');
    }
    if (this.organization.name == '') {
      this.setOrganizationError(true, 'Organisatienaam kan niet leeg zijn.');
    }
    if (this.testDomain == this.organization.domain) {
      this.setOrganizationError(true, 'Dit domein bestaat al.');
    }
    if (this.organization.domain == '') {
      this.setOrganizationError(true, 'Domein kan niet leeg zijn; voer uw email in.');
    }
    if (
      this.organization.name != '' &&
      this.testOrganizationName != this.organization.name &&
      this.organization.domain != '' &&
      this.testDomain != this.organization.domain
    ) {
      this.setOrganizationError(false, '');
    }
  }

  setUserError(error: boolean, errorMessage: string) {
    this.userError = error;
    this.userErrorMessage = errorMessage;
  }

  setOrganizationError(error: boolean, errorMessage: string) {
    this.organizationError = error;
    this.organizationErrorMessage = errorMessage;
  }
}
