import { Component, OnInit } from '@angular/core';
import {SearchService} from "./search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchValue: string = '';

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
  }

  search(value: any) {
    console.log('reached component',value);
    this.searchService.search(this.searchValue);

  }
}
