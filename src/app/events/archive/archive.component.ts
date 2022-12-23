import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../event.interface';


@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css'],
})
export class ArchiveComponent implements OnInit {
  events: Event[] = [];
  constructor(private readonly eventService: EventService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.eventService.getEvents().subscribe((response: any[]) => {
      this.events = response;
      for (const element of this.events) {
        if (element.dateOfEvent) element.dateOfEvent = new Date(element.dateOfEvent).toDateString();
      }
      console.log(this.events);
    });
  }
}
