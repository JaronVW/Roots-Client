import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick, flush, discardPeriodicTasks } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { mockTags } from './addeditevent.mockdata.tags';

import { AddediteventComponent } from './addeditevent.component';

describe('AddeventComponent', () => {
  let component: AddediteventComponent;
  let fixture: ComponentFixture<AddediteventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddediteventComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        NgMultiSelectDropDownModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddediteventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('there should be a submit button', fakeAsync(() => {
    let compiled = fixture.debugElement.queryAll(By.css('.submitButton'));
    expect(compiled.length).toEqual(1);
  }));

  it('form invalid when empty', fakeAsync(() => {
    spyOn(component, 'validate');

    let button = fixture.debugElement.nativeElement.querySelector('.submitButton');
    button.click();
    discardPeriodicTasks();
    tick();
    expect(component.validate).toHaveBeenCalled();
    flush();
  }));

  //testing if all fields are present
  it('there should be a field for the event title', fakeAsync(() => {
    let compiled = fixture.debugElement.queryAll(By.css('.title'));
    expect(compiled.length).toEqual(1);
  }));

  it('there should be a field for the event description', fakeAsync(() => {
    let compiled = fixture.debugElement.queryAll(By.css('#description'));
    expect(compiled.length).toEqual(1);
  }));

  it('there should be a field for the event date', fakeAsync(() => {
    let compiled = fixture.debugElement.queryAll(By.css('#dateOfEvent'));
    expect(compiled.length).toEqual(1);
  }));

  it('there should be a field for the event tags', fakeAsync(() => {
    let compiled = fixture.debugElement.queryAll(By.css('#tags'));
    expect(compiled.length).toEqual(1);
  }));

  it('there should be a field for files', fakeAsync(() => {
    let compiled = fixture.debugElement.queryAll(By.css('#file'));
    expect(compiled.length).toEqual(1);
  }));

  it('there should be an option to drag and drop files', fakeAsync(() => {
    let compiled = fixture.debugElement.queryAll(By.css('.dropzone'));
    expect(compiled.length).toEqual(1);
  }));

  it('there should be a add custom tag button', fakeAsync(() => {
    let compiled = fixture.debugElement.queryAll(By.css('.material-icons'));
    expect(compiled.length).toEqual(1);
  }));

  it('add custom tag button should be clickable', fakeAsync(() => {
    spyOn(component, 'openDialog');
    let button = fixture.debugElement.nativeElement.querySelector('.material-icons');
    button.click();
    tick();
    expect(component.openDialog).toHaveBeenCalled();
    flush();
  }));

  it('there should be tags in the dropdown menu', fakeAsync(() => {
    component.dropdownList = mockTags;
    fixture.detectChanges();
    component.changeTagName();
    let tagDropdown = fixture.debugElement.nativeElement.querySelector('#tags');
    tagDropdown.click();
    tick();
    let compiled = fixture.debugElement.queryAll(By.css('.multiselect-item-checkbox'));
    expect(compiled.length).toEqual(2);
    flush();
  }));

  it('there should be a button for custom tags', fakeAsync(() => {
    let compiled = fixture.debugElement.queryAll(By.css('.material-icons'));
    expect(compiled.length).toEqual(1);
  }));

  it('the button for custom tags should open a dialog', fakeAsync(() => {
    spyOn(component, 'openDialog');
    let button = fixture.debugElement.nativeElement.querySelector('.material-icons');
    button.click();
    tick();
    expect(component.openDialog).toHaveBeenCalled();
    flush();
  }));

  it('tagdropdown should be clickable', fakeAsync(() => {
    component.dropdownList = mockTags;
    fixture.detectChanges();
    let tagDropdown = fixture.debugElement.nativeElement.querySelector('#tags');
    tagDropdown.click();
    tick();
    let compiled = fixture.debugElement.queryAll(By.css('.multiselect-item-checkbox'));
    expect(compiled.length).toEqual(2);
    flush();
  }));

  it('there should be displayed how much one tag is used', fakeAsync(() => {
    component.dropdownList = mockTags;
    fixture.detectChanges();
    let tagDropdown = fixture.debugElement.nativeElement.querySelector('#tags');
    tagDropdown.click();
    tick();

    expect(component.dropdownList[0].count).toEqual(2);
  }));
});
