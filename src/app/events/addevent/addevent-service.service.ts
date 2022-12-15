import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, of} from "rxjs";
import {Event} from "./event.interface";

@Injectable({
  providedIn: 'root'
})
export class AddeventServiceService {
  public currentUser$ = new BehaviorSubject<null | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';

  constructor(
    private http: HttpClient,
  ) { }

    addEvent(event: Event): Observable<Event> {
      console.log('addEvent() in addevent-service.service.ts');
      console.log('event: ', event);
      return this.http.post<Event>('events', event);
    }

    getEvents(): Observable<Array<Event>> {
        return this.http.get<EventResponse>('events').pipe(
            map((body: EventResponse) => body.results),
        );
    }

    getEvent(id: string): Observable<Event> {
        return this.http.get<EventResponse>(`events/${id}`).pipe(
            map((body: EventResponse) => body.results[0]),
        );
    }

    updateEvent(id: string, event: Event): Observable<Event> {
        return this.http.put<Event>(`events/${id}`, event).pipe(
            // map((body: EventResponse) => body.results[0]),
        );
    }

    deleteEvent(id: string) {
        return this.http.delete(`events/${id}`);
    }

}


export interface EventResponse {
  results: Event[];
}
