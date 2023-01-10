import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  template: `
    <footer *ngIf="router.url !== '/login' && router.url !== '/register'" class="border-top footer">
      <div class="container">&copy; 2022 - Roots</div>
    </footer>
  `,
  styles: [
    'footer { background-color: #007469 !important; color: white; line-height: 60px; bottom: 0; width: 100%; position: absolute; }',
  ],
})
export class FooterComponent implements OnInit {
  constructor(public router: Router) {
    /* TODO document why this constructor is empty */
  }

  ngOnInit(): void {
    /* TODO document why this method 'ngOnInit' is empty */
  }
}
