import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../event.interface';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  constructor(private eventService: EventService) {
    
  }

  @Input() event: Event = {
    title: '',
    description: '',
    tags: []
  };
  @Input() id: number = 0;
  


  eventDetailsObject: Event = {
    title: '',
    description: '',
    tags: [],
  };

  loading: boolean = false;


  clearDetails() {
    this.eventDetailsObject = {
      title: '',
      description: '',
      tags: [],
    };
  }

  async archive(id: number) {
    this.eventService.archive(id).subscribe(() => { });
    window.location.reload();
  }

  async unarchive(id: number) {
    this.eventService.unarchive(id).subscribe(() => { });
    window.location.reload();
  }

  getEventDetails(id: number) {
    this.loading = true;
    this.eventService.getEvent(id).subscribe((response: any) => {
      this.eventDetailsObject = response;
      console.log(this.eventDetailsObject);
      this.loading = false;
    });
  }


  ngOnInit(): void {}
}
