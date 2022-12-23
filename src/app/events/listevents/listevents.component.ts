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
  hasSearched: boolean = false;

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  search(query: string) {
    this.getEvents(query);
    this.hasSearched = true;
  }

  clearSearch() {
    this.searchValue = '';
    this.getEvents();
    this.hasSearched = false;
  }

  archive(id: number) {
    this.eventService.archive(id).subscribe(() => {});
    this.getEvents();
  }

  getEvents(searchQuery?: string) {
    this.events = null;
    this.eventService.getEvents(undefined, undefined, undefined, searchQuery).subscribe((response: any[]) => {
      this.events = response;
      for (const element of this.events) {
        if (element.dateOfEvent) element.dateOfEvent = new Date(element.dateOfEvent).toDateString();
      }
      console.log(this.events);
    });
  }

  delete(id: number) {
    this.eventService.deleteEvent(id).subscribe(() => this.router.navigate(['/events']));
    this.getEvents();
  }
}
