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
  currentEventCount = 0;
  currentPage = 1;
  pageSize = 2;
  hasSearched: boolean = false;
  loading: boolean = false;
  showArchived: boolean = false;

  constructor(
    private router: Router,
    private eventService: EventService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

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
    this.showArchived = false;
    this.getEvents();
    this.hasSearched = false;
  }

  async archive(id: number) {
    this.eventService.archive(id).subscribe(() => {});
    window.location.reload();
  }

  async unarchive(id: number) {
    this.eventService.unarchive(id).subscribe(() => {});
    window.location.reload();
  }

  getEvents(searchQuery?: string, getArchivedItems?: boolean) {
    this.events = null;
    this.eventService
      .getEvents(
        (+this.currentPage - 1) * +this.pageSize,
        (+this.currentPage - 1) * +this.pageSize + +this.pageSize,
        undefined,
        searchQuery,
        getArchivedItems,
      )
      .subscribe((response: any[]) => {
        this.events = response;
        for (const element of this.events) {
          if (element.dateOfEvent)
            element.dateOfEvent = new Date(element.dateOfEvent).toLocaleDateString('nl-NL', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });
        }
        console.log(this.events);
      });

    this.eventService.getEventsCount(searchQuery, getArchivedItems).subscribe((response: number) => {
      this.currentEventCount = response;
    });
  }

  getEventDetails(accIndex: number, id: number) {
    this.loading = true;
    this.eventService.getEvent(id).subscribe((response: Event) => {
      this.events?.forEach((event, index) => {
        if (event.id == id) {
          this.events![index] = response;
          if (response.dateOfEvent)
            this.events![index].dateOfEvent = new Date(response.dateOfEvent).toLocaleDateString('nl-NL', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            });
          this.trackItem(accIndex, this.events![index]);
        }
      });
      let contentWrapper = this.document.querySelector(`#event-content-field-` + accIndex);
      if (contentWrapper && contentWrapper != null) contentWrapper.innerHTML = response.content ? response.content : '';
      this.loading = false;
    });
  }

  trackItem(index: number, item: Event) {
    return item.id;
  }

  delete(id: number) {
    this.eventService.deleteEvent(id).subscribe(() => this.router.navigate(['/events']));
    this.getEvents();
  }

  logState() {
    console.log(this.showArchived);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getEvents();
  }
}
