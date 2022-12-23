import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../event.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent implements OnInit {
  events: Event[] = [];
  constructor(private readonly eventService: EventService, private readonly router: Router) {}

  ngOnInit(): void {
    this.getEvents();
  }


  unarchive(id: number) {
    this.getEvents();
    this.eventService.unarchive(id).subscribe(() => {});
  }

  
  getEvents() {
    this.eventService.getEvents(undefined, undefined, undefined, undefined, true).subscribe((response: any[]) => {
      this.events = response;
      for (const element of this.events) {
        if (element.dateOfEvent) element.dateOfEvent = new Date(element.dateOfEvent).toDateString();
      }
      console.log(this.events);
    });
  }
}
