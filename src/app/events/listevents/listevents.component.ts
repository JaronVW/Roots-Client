import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../event.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listevents',
  templateUrl: './listevents.component.html',
  styleUrls: ['./listevents.component.css'],
})
export class ListeventsComponent implements OnInit {
  searchValue: string = '';
  events: Event[] | null = [];

  constructor(private router: Router, private EventService: EventService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  search(value: any) {}

  getEvents() {
    this.events = null;
    this.EventService.getEvents().subscribe((response: any[]) => {
      this.events = response;
      for (let i = 0; i < this.events.length; i++) {
        if (this.events[i].dateOfEvent)
          this.events[i].dateOfEvent = new Date(this.events[i].dateOfEvent!).toDateString();
      }
      console.log(this.events);
    });
  }

  delete(id: number) {
    this.EventService.deleteEvent(id).subscribe(() => this.router.navigate(['/events']));
    this.getEvents();
  }
}
