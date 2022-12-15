import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AddeventServiceService} from "./addevent-service.service";
import {Event} from "./event.interface";
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
  event: Event = {
    title: '',
    description: '',
  }


  constructor(
    private router: Router,
    private addeventService: AddeventServiceService,
    private _location: Location,
    ) {}

  ngOnInit(): void {}

  createEvent() {
    // add logic for creating an event here...
    this.addeventService.addEvent(this.event).subscribe(
      (response : Event) => {
        this.router.navigate(['/events']);
        console.log(response, 'response joepiee');
      });
  }

  backClicked() {
    this._location.back();
  }
}
