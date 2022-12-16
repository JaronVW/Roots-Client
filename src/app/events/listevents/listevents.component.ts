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
  events: Array<Event> = new Array<Event>;

  constructor(private SearchService: SearchService, private EventService: EventService) {}

  ngOnInit(): void {
    this.EventService.getEvents().subscribe((response) => {
      this.events = response;
    });
    console.log(this.events);
  }

  search(value: any) {
    console.log('reached component', value);
    this.SearchService.search(this.searchValue);
  }
}
