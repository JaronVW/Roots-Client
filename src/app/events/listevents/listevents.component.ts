import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../search/search.service';
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
  events: Event[] = [];

  constructor(private SearchService: SearchService, private EventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.getEvents();
  }

  search(value: any) {
    console.log('reached component', value);
    this.SearchService.search(this.searchValue);
  }

  getEvents(){
    this.EventService.getEvents().subscribe((response: any[]) => {
      this.events = response;
      console.log(this.events);
    });
  }

  delete(id: number) {
    this.EventService.deleteEvent(id);
    this.getEvents();
  }
}
