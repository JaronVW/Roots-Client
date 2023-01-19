import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { Tag } from '../../event.interface';

@Component({
  selector: 'app-input-with-tag-suggestions',
  templateUrl: './input-with-tag-suggestions.component.html',
  styleUrls: ['./input-with-tag-suggestions.component.css'],
})
export class InputWithTagSuggestionsComponent {
  @Input() title: string = '';
  @Input() tags: Tag[] = [];
  @Input() eventTags: Tag[] = [];
  @Output() titleChange = new EventEmitter<string>();
  @Output() tagsChange = new EventEmitter<Tag[]>();
  @Output() eventTagsChange = new EventEmitter<Tag[]>();

  @ViewChild('input') input!: ElementRef;
  @ViewChild('input') dropdown!: ElementRef;

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const emptyTag: Tag = { id: undefined, subject: '', count: 0 };
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
      this.input.nativeElement.blur();
    }
    this.filterTags();
  }

  showDropdown = false;
  suggestions: Tag[] = [];

  filterTags() {
    this.titleChange.emit(this.title);
    let words = this.title.split(' ').map((word) => word.toLowerCase());
    if (this.title.endsWith('.') || this.title.endsWith(' ')) {
      words = words.slice(0, -1);
    }
    this.suggestions = this.tags.filter((tag) => words.some((word) => tag.subject.toLowerCase().includes(word)));
    if (this.title === '') this.suggestions = [];
    this.showDropdown = this.suggestions.length !== 0;
  }

  timeout: any;
  onKeyUp() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.filterTags();
      this.showDropdown = this.suggestions.length > 0;
    }, 400);
  }

  addTagAndRemoveFromSuggestions(tag: Tag) {
    this.eventTags = [...this.eventTags, tag];
    this.eventTagsChange.emit(this.eventTags);
    this.filterTags();
  }

  selectedTag!: Tag;

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      const index = this.suggestions.indexOf(this.selectedTag);
      if (index > 0) {
        this.selectedTag = this.suggestions[index - 1];
      }
    } else if (event.key === 'ArrowUp') {
      const index = this.suggestions.indexOf(this.selectedTag);
      if (index < this.suggestions.length - 1) {
        this.selectedTag = this.suggestions[index + 1];
      }
    } else if (event.key === 'Enter') {
      this.addTagAndRemoveFromSuggestions(this.selectedTag);
    }
  }
}
