import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { OrganisationService } from '../organisation.service';
import jwt_decode from 'jwt-decode';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public isCollapsed = true;
  organisation = {
    name: '',
    domainName: '',
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
  organisationError: boolean = false;
  organisationErrorMessage: String = '';
  organisationSuccess: boolean = false;
  organisationSuccessMessage: String = '';
  res: any;

  constructor(
    private authService: AuthService,
    private organisationService: OrganisationService,
    private router: Router,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

  createDomain() {
    this.organisation.domainName = this.user.username.split('@')[1];
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
    if (
      !this.user.username.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
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
      this.user.username.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ) &&
      this.user.password != '' &&
      this.user.password.length > 7 &&
      this.user.password.length < 21 &&
      this.user.password == this.repeatpassword
    ) {
      this.setUserError(false, '');
      this.authService.register(this.user).subscribe(
        (response) => {
          this.setUserError(false, '');
          this.res = response;
          var decoded: any = jwt_decode(this.res.access_token);
          localStorage.setItem('token', this.res.access_token);
          localStorage.setItem('email', decoded.username);
          this.router.navigate(['/events']);
        },
        (error) => {
          if (error.error.message == 'Invalid credentials') this.setUserError(true, 'Email/wachtwoord combinatie is incorrect.');
        },
      );
    }
  }

  validateOrganisation() {
    if (this.organisation.name == '') {
      this.setOrganisationError(true, 'Organisatienaam kan niet leeg zijn.');
    }
    if (this.organisation.domainName == '') {
      this.setOrganisationError(true, 'Domein kan niet leeg zijn; voer uw email in.');
    }
    if (this.organisation.name != '' && this.organisation.domainName != '') {
      this.organisationService.create(this.organisation).subscribe(
        (response) => {
          this.setOrganisationError(false, '');
          this.res = response;
          this.setSuccess(
            true,
            'Organisatie "' +
              this.organisation.name +
              '" met domein "' +
              this.organisation.domainName +
              '" is succesvol aangemaakt.',
          );
        },
        (error) => {
          this.setOrganisationError(true, 'Organisatienaam/domein is al in gebruik.');
        },
      );
    }
  }

  setUserError(error: boolean, errorMessage: string) {
    this.userError = error;
    this.userErrorMessage = errorMessage;
  }

  setOrganisationError(error: boolean, errorMessage: string) {
    this.organisationError = error;
    this.organisationErrorMessage = errorMessage;
  }

  setSuccess(success: boolean, successMessage: string) {
    this.organisationSuccess = success;
    this.organisationSuccessMessage = successMessage;
  }

  open(content: any) {
    if (this.organisation.name == '') {
      this.setOrganisationError(true, 'Organisatienaam kan niet leeg zijn.');
    }
    if (this.organisation.domainName == '') {
      this.setOrganisationError(true, 'Domein kan niet leeg zijn; voer uw email in.');
    }
    if (
      !this.user.username.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      this.setOrganisationError(true, 'Email moet valide zijn.');
    }
    if (
      this.organisation.name != '' &&
      this.organisation.domainName != '' &&
      this.user.username.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }
  }
}
