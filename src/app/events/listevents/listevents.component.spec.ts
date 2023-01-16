import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { mockEvent1, mockEvent2, mockEvents } from './listevents.mockdata';

import { ListeventsComponent } from './listevents.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatMenuModule } from '@angular/material/menu';
import { By } from '@angular/platform-browser';

describe('ListeventsComponent', () => {
  let component: ListeventsComponent;
  let fixture: ComponentFixture<ListeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeventsComponent],
      imports: [HttpClientModule, CdkAccordionModule, MatMenuModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have search bar', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input')).toBeTruthy();
  });

  it('data should go in component.events', fakeAsync(() => {
    component.events = mockEvents;
    expect(component.events).toEqual(mockEvents);
  }));

  it('data should be in cards', fakeAsync(() => {
    component.events = mockEvents;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.example-accordion')).toBeTruthy();
  }));

  it('should have 2 cards', fakeAsync(() => {
    component.events = mockEvents;
    fixture.detectChanges();
    let compiled = fixture.debugElement.queryAll(By.css('.example-accordion-item'));
    expect(compiled.length).toEqual(2);
  }));

  it('should have 2 cards with correct data', fakeAsync(() => {
    component.events = mockEvents;
    fixture.detectChanges();
    let compiled = fixture.debugElement.queryAll(By.css('.example-accordion-item'));

    expect(compiled[0].nativeElement.textContent).toContain(mockEvent1.title);
    expect(compiled[1].nativeElement.textContent).toContain(mockEvent2.title);
  }));

  it('card 1 should have title that equals mockEvent1.title', fakeAsync(() => {
    component.events = mockEvents;
    fixture.detectChanges();
    let compiled = fixture.debugElement.queryAll(By.css('.event-title'));

    expect(compiled[0].nativeElement.textContent).toEqual(mockEvent1.title);
  }));

  it('there should be a checkbox to display archived events', fakeAsync(() => {
    component.events = mockEvents;
    fixture.detectChanges();
    let compiled = fixture.debugElement.queryAll(By.css('.form-check-label'));

    expect(compiled.length).toEqual(1);
  }));
});
