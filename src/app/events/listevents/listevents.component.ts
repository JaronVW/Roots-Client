import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../search/search.service';

@Component({
  selector: 'app-listevents',
  templateUrl: './listevents.component.html',
  styles: [
    '.input { width: 60%; height: 40px; padding-left: 2.5rem; border: 2px solid transparent; border-radius: 8px; background-color: #f3f3f4; transition: .3s ease; }',
    '.input::placeholder { color: #9e9ea7; }',
    '.input:focus, input:hover { outline: none; border-color: rgb(234 76 137 / 10%); background-color: #fff; box-shadow: 0 0 0 4px rgb(234 76 137 / 10%); }',
    '.icon { fill: #9e9ea7; margin: 11px 0px 0px 15px; width: 1rem; height: 1rem; position: absolute; }',
    'button { float: right; }',
    '.card { margin-top: 10px; }',
  ],
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
