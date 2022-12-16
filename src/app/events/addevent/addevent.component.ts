import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { Event } from '../event.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
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
export class AddeventComponent implements OnInit {
  title: string = '';
  description: string = '';
  date: Date = new Date();

  event: Event = {
    title: '',
    description: '',
    // date: new Date(),
    // tags: ['test', 'test2'],
    // files: ['test', 'test2'],
    // userId: 'test',
    // multiMedia: ['test', 'test2'],
  };

  constructor(private router: Router, private EventService: EventService, private _location: Location) {}

  ngOnInit(): void {}

  createEvent() {
    // add logic for creating an event here...
    this.event.title = this.title;
    this.event.description = this.description;
    // this.event.date = new Date();
    console.log(this.event);
    this.EventService.addEvent(this.event).subscribe((response: Event) => {
      this.router.navigate(['/events']);
      console.log(response, 'response joepiee');
    });
  }

  backClicked() {
    this._location.back();
  }
}
