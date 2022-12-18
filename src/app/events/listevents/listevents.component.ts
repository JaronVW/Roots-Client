import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../search/search.service';
import { EventService } from '../event.service';
import { Event } from '../event.interface';

@Component({
  selector: 'app-listevents',
  templateUrl: './listevents.component.html',
  styleUrls: ['./listevents.component.css'],
})
export class ListeventsComponent implements OnInit {
  searchValue: string = '';
  events: Event[] | null = [];

  constructor(private SearchService: SearchService, private EventService: EventService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  search(value: any) {
    this.SearchService.search(this.searchValue);
  }

  getEvents() {
    this.events = null;
    this.EventService.getEvents().subscribe((response: any[]) => {
      this.events = response;
      console.log(response);
    });
  }

  delete(id: number) {
    this.EventService.deleteEvent(id);
    this.getEvents();
  }
}
