import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public isCollapsed = false;
  email: String = '';
  domain: String = '';
  constructor() {
    /* TODO document why this constructor is empty */
  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }

  createDomain() {
    this.domain = this.email.split('@')[1];
  }
}
