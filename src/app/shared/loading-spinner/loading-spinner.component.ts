import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: ` <span class="loader"></span> `,
  styles: [
    `
      .loader {
        width: 48px;
        height: 48px;
        border: 5px solid black;
        border-bottom-color: transparent;
        border-radius: 50%;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
        /* margin-left: auto;
        margin-right: auto; */
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
export class LoadingSpinnerComponent {
  constructor() {}
}
