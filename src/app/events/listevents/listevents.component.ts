import { Component, Inject, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../event.interface';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-listevents',
  templateUrl: './listevents.component.html',
  styleUrls: ['./listevents.component.css'],
})
export class ListeventsComponent implements OnInit {
  _searchValue: string = '';
  events: Event[] | null = [];
  hasSearched: boolean = false;
  eventDetailsObject: Event = {
    title: '',
    description: '',
    tags: [],
  };
  
  loading: boolean = false;
  showArchived: boolean = false;

  constructor(private router: Router, private eventService: EventService,@Inject(DOCUMENT) private document: Document) {}

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
    if (this.showArchived) this.getEvents(query, this.showArchived);
    else this.getEvents(query);
    this.hasSearched = true;
  }

  clearSearch() {
    this._searchValue = '';
    this.getEvents();
    this.hasSearched = false;
  }

  async archive(id: number) {
    await this.eventService.archive(id).subscribe(() => {});
    window.location.reload();
  }

  async unarchive(id: number) {
    await this.eventService.unarchive(id).subscribe(() => {});
    window.location.reload();
  }

  getEvents(searchQuery?: string, getArchivedItems?: boolean) {
    this.events = null;
    this.eventService
      .getEvents(undefined, undefined, undefined, searchQuery, getArchivedItems)
      .subscribe((response: any[]) => {
        this.events = response;
        for (const element of this.events) {
          if (element.dateOfEvent) element.dateOfEvent = new Date(element.dateOfEvent).toDateString();
        }
        console.log(this.events);
      });
  }

  clearDetails() {
    this.eventDetailsObject = {
      title: '',
      description: '',
      tags: [],
    };
  }

  getEventDetails(id: number) {
    this.loading = true;
    this.eventService.getEvent(id).subscribe((response: any) => {
      this.eventDetailsObject = response;
      console.log(this.eventDetailsObject);
      this.loading = false;
    });
  }

 

  delete(id: number) {
    this.eventService.deleteEvent(id).subscribe(() => this.router.navigate(['/events']));
    this.getEvents();
  }

  logState() {
    console.log(this.showArchived);
  }
}
