import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  template: `
    <footer
      *ngIf="
        router.url !== '/login' &&
        router.url !== '/register' &&
        router.url !== '/accountrecovery' &&
        !router.url.includes('/passwordreset') &&
        !this.router.url.includes('/verifyaccount')
      "
      class="border-top footer"
    >
      <div class="container">&copy; 2022 - Roots</div>
    </footer>
  `,
  styles: ['footer { line-height: 60px; bottom: 0; width: 100%; position: absolute; }'],
})
export class FooterComponent {
  constructor(public router: Router) {}
}
