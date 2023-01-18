import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organisation } from './organisation.interface';

@Injectable({
  providedIn: 'root',
})
export class OrganisationService {

  constructor(private http: HttpClient) {}

  create(organisation: Organisation) {
    return this.http.post(`organisations`, organisation);
  }

}
