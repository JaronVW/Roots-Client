import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Event, Tag } from './event.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  public currentUser$ = new BehaviorSubject<null | undefined>(undefined);

  constructor(private http: HttpClient) {}

  addEvent(event: Event): Observable<Event> {
    let formData = new FormData();
    event.multimediaItems?.forEach((element, index) => {
      if (element.file != undefined) {
        formData.append('files', element.file);
        formData.append(`multimediaItems[${index}][multimedia]`, element.multimedia);
      }
    });

    event.tags.forEach((element, index) => {
      formData.append(`tags[${index}][subject]`, element.subject);
    });

    formData.append('title', event.title);
    formData.append('description', event.description);
    formData.append('dateOfEvent', event.dateOfEvent!);
    formData.append('content', event.content!);
    return this.http.post<Event>('events', formData);
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

  getEventsCount(searchQuery?: string, getArchivedItems?: boolean): Observable<number> {
    let queryparams = '?';
    if (searchQuery) queryparams += `searchQuery=${searchQuery}&`;
    if (getArchivedItems) queryparams += `getArchivedItems=${getArchivedItems}`;
    return this.http.get<number>('events/count' + queryparams);
  }

  getEvent(id: number): Observable<any> {
    return this.http.get<Event>(`events/${id}`).pipe(map((body: Event) => body));
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>('tags');
  }

  getFile(filename: string) {
    return this.http.get(`file/${filename}`);
  }

  updateEvent(id: number, event: Event): Observable<Event> {
    let formData = new FormData();
    event.multimediaItems?.forEach((element, index) => {
      if (element.path) formData.append(`multimediaItems[${index}][path]`, element.path);
      formData.append('files', element.file ? element.file : '');
      formData.append(`multimediaItems[${index}][multimedia]`, element.multimedia);
    });

    event.tags.forEach((element, index) => {
      formData.append(`tags[${index}][subject]`, element.subject);
    });

    formData.append('title', event.title);
    formData.append('description', event.description);
    formData.append('dateOfEvent', event.dateOfEvent!);
    formData.append('id', event.id?.toString()!);
    formData.append('content', event.content!);

    return this.http.put<Event>(`events/${id}`, formData);
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
