import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addevent',
  templateUrl: './addeditevent.component.html',
  styles: [
    'button { margin-top: 10px; margin-right: 10px; width: 45%; }',
    '.form-check, .form-group { padding-top: 10px; }',
    'h1 { padding-top: 10px; }',
    'textarea { height: 111px; }',
    '.list-group-flush { border-top-left-radius: 5px; border-bottom-left-radius: 5px; height: 160px; overflow:hidden; overflow-y:scroll; }',
    'a { text-decoration: none; }',
    'a:hover { text-decoration: underline; }',
  ],
})
export class AddediteventComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  createEvent() {
    // add logic for creating an event here...
    this.router.navigate(['/']);
  }
}
