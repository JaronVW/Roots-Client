import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { Event, Tag } from '../event.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addevent',
  templateUrl: './addeditevent.component.html',
  styleUrls: ['./addeditevent.component.css'],
})
export class AddediteventComponent implements OnInit {
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings = {};
  error: boolean = false;
  errorMessage: string = '';
  isFirstVisit: boolean = true;
  buttonText: string = 'Create';
  eventid: string | null = '';
  isEditing: boolean = false;

  event: Event = {
    title: '',
    description: '',
    dateOfEvent: new Date().toISOString(),
    // userId: 'test',
    tags: [{ subject: '' }],
    // customtags ['test', 'test2'],
    // multiMedia: ['test', 'test2'],
  };

  constructor(
    private router: Router,
    private EventService: EventService,
    private _location: Location,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.eventid = this.route.snapshot.paramMap.get('id');
    if (this.eventid) {
      this.isEditing = true;
      this.EventService.getEvent(this.eventid).subscribe((response: Event) => {
        this.event = response;
        console.log(this.event);
        if (response.dateOfEvent) this.event.dateOfEvent = new Date(response.dateOfEvent).toISOString();
      });
    }

    if (this.isEditing) this.buttonText = 'Update';

    this.dropdownList = [
      { item_id: 1, item_text: 'Finances' },
      { item_id: 2, item_text: 'Relocation' },
      { item_id: 3, item_text: 'Work culture' },
    ];
    this.selectedItems = [];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };
  }

  validate() {
    if (this.selectedItems.length <= 0) this.setError(true, 'You must select at least 1 tag.');
    if (this.event.description == '') this.setError(true, 'Description can not be empty.');
    if (this.event.title == '') this.setError(true, 'Title can not be empty.');
    if (this.event.title != '' && this.event.description != '' && this.selectedItems.length > 0) {
      this.setError(false, '');
      if (this.isEditing) {
        this.updateEvent();
      } else {
        this.createEvent();
      }
    }
  }

  createEvent() {
    const data = {
      title: this.event.title,
      description: this.event.description,
    };
    this.EventService.addEvent(data).subscribe((response: Event) => {
      this.router.navigate(['/events']);
      console.log(response);
    });
  }

  updateEvent() {
    if (this.eventid != null)
      this.EventService.updateEvent(this.eventid, this.event).subscribe((response: Event) => {
        this.router.navigate(['/events']);
        console.log(response);
      });
  }

  setError(error: boolean, errorMessage: string) {
    this.error = error;
    this.errorMessage = errorMessage;
  }

  onItemSelect(item: any) {
    //Do something if required
    console.log(item);
    this.addToSelectedItems(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    //Do something if required
    console.log(items);
    this.addToSelectedItems(items);
    console.log(this.selectedItems);
  }

  addToSelectedItems(items: any) {
    if (Array.isArray(items)) {
      for (let i = 0; i < items.length; i++) {
        this.selectedItems.push(items[i]);
      }
    } else {
      this.selectedItems.push(items);
    }
  }

  onDeSelect(items: any) {
    if (Array.isArray(items)) {
      this.selectedItems.splice(0);
    } else {
      for (let i = 0; i < this.selectedItems.length; i++) {
        if (this.selectedItems[i].item_text == items.item_text) {
          this.selectedItems.splice(i, 1);
          break;
        }
      }
    }
  }

  backClicked() {
    this._location.back();
  }
}
