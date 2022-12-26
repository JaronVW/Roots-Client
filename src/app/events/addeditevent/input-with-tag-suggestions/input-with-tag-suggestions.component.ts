import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {Tag} from "../../event.interface";
import {ListKeyManager} from "@angular/cdk/a11y";

@Component({
  selector: 'app-input-with-tag-suggestions',
  templateUrl: './input-with-tag-suggestions.component.html',
  styleUrls: ['./input-with-tag-suggestions.component.css']
})
export class InputWithTagSuggestionsComponent implements OnInit {


  @Input() tags: Tag[] = [];
  @Output() addTag = new EventEmitter<Tag>();
  @Output() removeTag = new EventEmitter<Tag>();

  suggestions: Tag[] = [];
  title: any;
  keyboardEventsManager: ListKeyManager<any> | undefined;
  constructor() { }
  ngOnInit(): void {
    this.suggestions = this.tags;
  }

  filterTags($event: KeyboardEvent) {
    const title = ($event.target as HTMLInputElement).value;
    const words = title.split(' ').map(word => word.toLowerCase());
    this.suggestions = this.tags.filter(tag => words.some(word => tag.subject.toLowerCase().includes(word)));
    }




    // this.suggestions = this.tags.filter(tag => words.includes(tag.subject.toLowerCase()));



}
