import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  username = '';

  constructor(public router: Router) {}

  ngOnInit(): void {}

  logout() {
    localStorage.setItem('token', '');
    this.router.navigate(['/login']);
  }

  getUsername() {
    return localStorage.getItem('email');
  }
}
