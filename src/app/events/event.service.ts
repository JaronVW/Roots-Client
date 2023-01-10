import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
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

  getEvents(
    min?: number,
    max?: number,
    order?: string,
    searchQuery?: string,
    getArchivedItems?: boolean,
  ): Observable<Array<Event>> {
    let queryparams = '?';
    if (min) queryparams += `min=${min}&`;
    if (max) queryparams += `max=${max}&`;
    if (order) queryparams += `order=${order}&`;
    if (searchQuery) queryparams += `searchQuery=${searchQuery}&`;
    if (getArchivedItems) queryparams += `getArchivedItems=${getArchivedItems}`;
    return this.http.get<Array<Event>>('events' + queryparams);
  }

  getEvent(id: number): Observable<any> {
    return this.http.get<Event>(`events/${id}`).pipe(map((body: Event) => body));
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>('tags');
  }

  updateEvent(id: number, event: Event): Observable<Event> {
    return this.http.put<Event>(`events/${id}`, event).pipe(
      // map((body: EventResponse) => body.results[0]),
      tap((body: Event) => console.log('body: ', body)),
    );
  }

  deleteEvent(id: number) {
    return this.http.delete(`events/${id}`);
  }

  unarchive(id: number) {
    return this.http.patch(`events/${id}/unarchive`, null);
  }

  archive(id: number) {
    return this.http.patch(`events/${id}/archive`, null);
  }
}
