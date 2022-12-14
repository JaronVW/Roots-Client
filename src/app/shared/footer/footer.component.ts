import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="border-top footer">
      <div class="container">&copy; 2022 - Roots</div>
    </footer>
  `,
  styles: [
    'footer { background-color: #007469 !important; color: white; line-height: 60px; bottom: 0; width: 100%; position: absolute; }',
  ],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

