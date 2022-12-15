import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
    '.input { width: 50%; height: 40px; padding-left: 2.5rem; border: 2px solid transparent; border-radius: 8px; background-color: #f3f3f4; transition: .3s ease; }',
    '.input::placeholder { color: #9e9ea7; }',
    '.input:focus, input:hover { outline: none; border-color: rgb(234 76 137 / 10%); background-color: #fff; box-shadow: 0 0 0 4px rgb(234 76 137 / 10%); }',
    '.icon { fill: #9e9ea7; margin: 11px 0px 0px 15px; width: 1rem; height: 1rem; position: absolute; }',
    '.container { width: 70%; position: absolute; top: 40%; transform: translateY(-50%); }',
    'h1 { font-size: 50px; }',
    'button { margin-top: 15px; width: 15%; }'
  ],
})
export class SearchComponent implements OnInit {
  searchValue: string = '';

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  search(value: any) {
    console.log('reached component', value);
    this.searchService.search(this.searchValue);
  }
}
