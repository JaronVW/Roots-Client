import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router) {
    /* TODO document why this constructor is empty */
  }

  ngOnInit(): void {
    /* TODO document why this method 'ngOnInit' is empty */
  }
}
