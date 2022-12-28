import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter, HostListener,
  Input,
  OnInit,
  Output,
  QueryList, ViewChild,
  ViewChildren
} from '@angular/core';
import {Tag} from "../../event.interface";
import {ListKeyManager} from "@angular/cdk/a11y";

@Component({
  selector: 'app-input-with-tag-suggestions',
  templateUrl: './input-with-tag-suggestions.component.html',
  styleUrls: ['./input-with-tag-suggestions.component.css']
})
export class InputWithTagSuggestionsComponent implements OnInit{
  @Input() tags: Tag[] = [];
  @Output() addTag = new EventEmitter<Tag>();
  @Output() removeTag = new EventEmitter<Tag>();
  @Output() titleChange = new EventEmitter<string>();
  @ViewChild('input') input!: ElementRef;
  @ViewChild('input') dropdown!: ElementRef;
  @HostListener('document:click', ['$event'])

  onClick(event: MouseEvent) {
    const emptyTag: Tag = {id: undefined, subject: ''};
    const input = this.input.nativeElement;
    const dropdown = this.dropdown.nativeElement;
    if (event.target !== input && event.target !== dropdown) {
      this.suggestions = [];
      this.selectedTag = emptyTag;
      this.showDropdown = false;
    }
  }
  onFocus() {
    if (this.showDropdown) {
      console.log('focus')
      this.input.nativeElement.blur();
    }
  }

  showDropdown = false;
  suggestions: Tag[] = [];
  title = '';
  constructor() { }
  ngOnInit(): void {
    this.suggestions = this.tags;
  }

  filterTags(title: string): Tag[] {
    this.titleChange.emit(title);
    let words = title.split(' ').map(word => word.toLowerCase());
    if (title.endsWith('.') || title.endsWith(' ')) {
      words = words.slice(0, -1);
    }
    this.suggestions = this.tags.filter(tag => words.some(word => tag.subject.toLowerCase().includes(word)));
    if (title === '') this.suggestions = [];
    this.showDropdown = this.suggestions.length !== 0;
    console.log('dropdown: ', this.showDropdown);
    return this.suggestions;
  }

  timeout: any;
  onKeyUp() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.suggestions = this.filterTags(this.title);
      this.showDropdown = this.suggestions.length > 0;
    }, 700);
  }

  addTagAndRemoveFromSuggestions(tag: Tag) {
    this.addTag.emit(tag);
    this.suggestions = this.suggestions.filter(suggestion => suggestion.id !== tag.id);
  }

  selectedTag!: Tag;

  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === 38) {
      // up arrow key
      // select the previous item in the list
      const index = this.suggestions.indexOf(this.selectedTag);
      if (index > 0) {
        this.selectedTag = this.suggestions[index - 1];
      }
    } else if (event.keyCode === 40) {
      // down arrow key
      // select the next item in the list
      const index = this.suggestions.indexOf(this.selectedTag);
      if (index < this.suggestions.length - 1) {
        this.selectedTag = this.suggestions[index + 1];
      }
    } else if (event.keyCode === 13) {
      // enter key
      // add the selected item to the list of tags
      this.addTagAndRemoveFromSuggestions(this.selectedTag);
    }
  }
}
