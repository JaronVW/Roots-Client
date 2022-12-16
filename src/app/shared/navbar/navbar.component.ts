import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  template: ` <!-- Navbar -->
    <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-dark border-bottom box-shadow mb-3 bg-blue-green">
      <div class="container-fluid">
        <img src="assets/images/logo-with-circle.png" alt="Image of the logo" routerLink="/home" />

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target=".navbar-collapse"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
          <ul class="navbar-nav flex-grow-1">
            <li class="nav-item">
              <a class="nav-link" routerLink="/home" routerLinkActive="active" ariaCurrentWhenActive="page">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/events" routerLinkActive="active" ariaCurrentWhenActive="page">Events</a>
            </li>
          </ul>
          <ul class="navbar-nav flex-grow-2">
            <!-- Links to have on the right side of the navbar. -->
            <!-- <li class="nav-item">
              <a
                class="nav-link"
                routerLink="/login"
                routerLinkActive="active"
                ariaCurrentWhenActive="page"
                >Login</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                routerLink="/register"
                routerLinkActive="active"
                ariaCurrentWhenActive="page"
                >Register</a
              >
            </li> -->
          </ul>
        </div>
      </div>
    </nav>`,
  styles: [
    'nav { background-color: #007469 !important; color: white; }',
    'nav img { width: 50px; margin-right: 10px; }',
    'nav img:hover { cursor: pointer; }',
  ],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
