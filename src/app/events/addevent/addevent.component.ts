import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styles: [
    'button { width: 100%; margin-top: 10px; }',
    '.form-check, .form-group { padding-top: 10px; }',
    'h1 { padding-top: 10px; }',
    'textarea { height: 150px; }',
    'select { width: 100%; }'
  ],
})

export class AddeventComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  createEvent() {
    // add logic for creating an event here...
    this.router.navigate(['/']);
  }
}
