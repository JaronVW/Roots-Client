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
  events: Event[] = [];

  constructor(private SearchService: SearchService, private EventService: EventService) {}

  ngOnInit(): void {
    this.EventService.getEvents().subscribe((response: any[]) => {
      this.events = response;
      for (let i = 0; i < this.events.length; i++) {
        if (this.events[i].dateOfEvent)
          this.events[i].dateOfEvent = new Date(this.events[i].dateOfEvent!).toDateString();
      }
      console.log(this.events);
    });
  }

  search(value: any) {
    console.log('reached component', value);
    this.SearchService.search(this.searchValue);
  }
}
