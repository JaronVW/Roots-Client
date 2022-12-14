import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient,
  ) { }


  search(searchValue: string):Observable<Array<Event>> | null {
    console.log('reached service',searchValue);
    // return this.http.get<EventResponse>(`/search/${searchValue}`).pipe(
    //   map((response: EventResponse) => response.results)
    // )
    return null;
  }
}

export interface EventResponse {
  results: Array<Event>;
}
