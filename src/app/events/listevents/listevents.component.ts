import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../search/search.service';

@Component({
  selector: 'app-listevents',
  templateUrl: './listevents.component.html',
  styleUrls: ['./listevents.component.css'],
})
export class ListeventsComponent implements OnInit {
  searchValue: string = '';

  constructor(private SearchService: SearchService) {}

  ngOnInit(): void {}

  search(value: any) {
    console.log('reached component', value);
    this.SearchService.search(this.searchValue);
  }
}
