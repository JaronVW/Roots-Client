import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent  {
  username = '';
  isNavbarCollapsed = true;

  constructor(public router: Router) {}


  logout() {
    localStorage.setItem('token', '');
    localStorage.setItem('email', '');
    this.router.navigate(['/login']);
  }

  getUsername() {
    return localStorage.getItem('email');
  }
}
