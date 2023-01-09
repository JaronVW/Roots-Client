import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';
import { Event, Tag } from '../event.interface';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddtagDialogComponent } from './addtag-dialog/addtag-dialog.component';
import { debounceTime, distinctUntilChanged, map, Observable, OperatorFunction } from 'rxjs';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addevent',
  templateUrl: './addeditevent.component.html',
  styleUrls: ['./addeditevent.component.css'],
})
export class AddediteventComponent implements OnInit {
  dropdownList: any = [];
  dropdownSettings = {};
  error: boolean = false;
  errorMessage: string = '';
  isFirstVisit: boolean = true;
  buttonText: string = 'Aanmaken';
  eventid: number | null = null;
  isEditing: boolean = false;

  event: Event = {
    title: '',
    description: '',
    content: '',
    dateOfEvent: new Date().toISOString(),
    // userId: 'test',
    tags: [],
    // customtags ['test', 'test2'],
    // multiMedia: ['test', 'test2'],
  };

  searchTags = this.dropdownList.filter((tag: Tag) => !this.event.tags.includes(tag));

  constructor(
    private router: Router,
    private EventService: EventService,
    private _location: Location,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.eventid = Number(this.route.snapshot.paramMap.get('id'));
    if (this.eventid) {
      this.isEditing = true;
      this.EventService.getEvent(this.eventid).subscribe((response: Event) => {
        this.event = response;
        console.log(this.event);
        if (response.dateOfEvent) this.event.dateOfEvent = new Date(response.dateOfEvent).toISOString();
      });
    }

    if (this.isEditing) this.buttonText = 'Update';

    this.EventService.getTags().subscribe((response: any[]) => {
      this.dropdownList = response.map((tag: Tag) => ({ ...tag }));
      this.searchTags = this.dropdownList.filter((tag: Tag) => !this.event.tags.includes(tag));
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'subject',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      enableCheckAll: false,
    };
  }

  validate() {
    if (this.event.tags.length <= 0) {
      this.setError(true, 'You must select at least 1 tag.');
      throw new Error('You must select at least 1 tag.');
    }
    if (this.event.description == '') {
      this.setError(true, 'Description can not be empty.');
      throw new Error('Description can not be empty.');
    }
    if (this.event.title == '') {
      this.setError(true, 'Title can not be empty.');
      throw new Error('Title can not be empty.');
    }
    if (this.event.title != '' && this.event.description != '' && this.event.tags.length > 0) {
      this.setError(false, '');
      if (this.isEditing) {
        this.updateEvent();
      } else {
        this.createEvent();
      }
    }
  }

  createEvent() {
    console.log(this.event);
    if (this.event.dateOfEvent) this.event.dateOfEvent = new Date(this.event.dateOfEvent).toISOString();
    const data = {
      ...this.event,
    };
    this.EventService.addEvent(data).subscribe((response: Event) => {
      this.router.navigate(['/events']);
      console.log(response);
    });
  }

  updateEvent() {
    if (this.eventid != null) {
      if (this.event.dateOfEvent) this.event.dateOfEvent = new Date(this.event.dateOfEvent).toISOString();
      this.EventService.updateEvent(this.eventid, this.event).subscribe((response: Event) => {
        this.router.navigate(['/events']);
        console.log(response);
      });
    }
  }

  setError(error: boolean, errorMessage: string) {
    this.error = error;
    this.errorMessage = errorMessage;
  }

  backClicked() {
    this._location.back();
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) => {
        console.log(term);
        console.log(text$);
        return term.length < 2
          ? []
          : [].filter((v: string) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
      }),
    );

  addTag(tag: Tag) {
    console.log('addTag');
    // const newTag: Tag = {
    //   subject: tag.subject,
    // };
    // this.dropdownList.push({ id: undefined, subject: tag.subject });
    this.event.tags = [...this.event.tags, tag];
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddtagDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result != undefined) {
        this.dropdownList.push({ id: this.dropdownList.length + 1, subject: result });
        this.event.tags = [...this.event.tags, result];

        console.log('event tags:', this.event.tags);
      }
    });
  }

  getTitle($event: string) {
    // console.log('reached parent',$event);
    this.event.title = $event;
  }
}
