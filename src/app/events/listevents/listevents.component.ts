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
  _searchValue: string = '';
  events: Event[] | null = [];
  hasSearched: boolean = false;
  data: any;

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  get searchValue(): string {
    return this._searchValue;
  }

  set searchValue(value: string) {
    if (value !== this._searchValue) {
      this._searchValue = value;
      this.automaticSearchReset();
    }
  }

  private automaticSearchReset() {
    if (this._searchValue == '') {
      this.clearSearch();
    }
  }

  search(query: string) {
    this.getEvents(query);
    this.hasSearched = true;
  }

  clearSearch() {
    this._searchValue = '';
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
