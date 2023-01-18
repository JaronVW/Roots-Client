import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrganisationService {

  constructor(private http: HttpClient) {}

  get(id: number) {
    return this.http.get(`organisations/${id}`);
  }

}
