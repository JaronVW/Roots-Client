import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: ` <span class="loader"></span> `,
  styles: [
    `
      .loader {
        width: 20px;
        height: 20px;
        border: 2px solid black;
        border-bottom-color: transparent;
        border-radius: 50%;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
        display: inline-block;
      }

      @keyframes rotation {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoadingSpinnerComponent {}
