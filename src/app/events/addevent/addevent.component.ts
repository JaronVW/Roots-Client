import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styles: [
    'button { margin-top: 10px; margin-right: 10px; width: 45%; }',
    '.form-check, .form-group { padding-top: 10px; }',
    'h1 { padding-top: 10px; }',
    'textarea { height: 111px; }',
    '.list-group-flush { border-top-left-radius: 5px; border-bottom-left-radius: 5px; height: 160px; overflow:hidden; overflow-y:scroll; }',
    'a { text-decoration: none; }',
    'a:hover { text-decoration: underline; }',
    '.validField {  border:2px solid green; display: block;  }',
    '.invalidField {  border:2px solid red; display: block;  }',
    '::ng-deep .multiselect-dropdown .dropdown-btn {width: -webkit-fill-available !important}',
    '::ng-deep .multiselect-dropdown .dropdown-btn:focus {outline: none !important}',
  ],
})
export class AddeventComponent implements OnInit {
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings = {};
  requiredField: boolean = false;

  constructor(private router: Router, private _location: Location) {}

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Test1' },
      { item_id: 2, item_text: 'Test2' },
      { item_id: 3, item_text: 'Test3' },
      { item_id: 4, item_text: 'Test4' },
      { item_id: 5, item_text: 'Test5' },
    ];
    this.selectedItems = [];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };
    this.setStatus();
  }

  setStatus() {
    this.selectedItems.length > 0
      ? (this.requiredField = true)
      : (this.requiredField = false);
  }

  onItemSelect(item: any) {
    //Do something if required
    console.log(item);
    this.addToSelectedItems(item);
    this.setClass();
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    //Do something if required
    console.log(items);
    this.addToSelectedItems(items);
    this.setClass();
    console.log(this.selectedItems);
  }

  addToSelectedItems(items: any) {
    if (Array.isArray(items)) {
      for (let i = 0; i < items.length; i++) {
        this.selectedItems.push(items[i]);
      }
    } else {
      this.selectedItems.push(items);
    }
  }

  onDeSelect(items: any) {
    if (Array.isArray(items)) {
      this.selectedItems.splice(0);
    } else {
      for (let i = 0; i < this.selectedItems.length; i++) {
        if (this.selectedItems[i].item_text == items.item_text) {
          this.selectedItems.splice(i, 1);
          break;
        }
      }
    }
    this.setClass();
  }

  setClass() {
    this.setStatus();
    if (this.selectedItems.length > 0) {
      return 'validField';
    } else {
      return 'invalidField';
    }
  }

  createEvent() {
    // add logic for creating an event here...
    this.router.navigate(['/']);
  }

  backClicked() {
    this._location.back();
  }

  submission() {
    if (this.requiredField == false) {
      /* Print a message that not all required fields were filled... */
    }
    /* Do form submission... */
  }
}
