import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Event, Tag } from './event.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  public currentUser$ = new BehaviorSubject<null | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';

  constructor(private http: HttpClient) {}

  addEvent(event: Event): Observable<Event> {
    console.log('event: ', event);
    return this.http.post<Event>('events', event);
  }

  getEvents(): Observable<Array<Event>> {
    return this.http.get<Array<Event>>('events');
  }

  getEvent(id: string): Observable<any> {
    return this.http.get<Event>(`events/${id}`).pipe(map((body: Event) => body));
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>('tags');
  }

  updateEvent(id: string, event: Event): Observable<Event> {
    return this.http
      .put<Event>(`events/${id}`, event)
      .pipe
      // map((body: EventResponse) => body.results[0]),
      ();
  }

  deleteEvent(id: number) {
    return this.http.delete(`events/${id}`).subscribe();
  }
}

export interface EventResponse {
  results: Event[];
}
