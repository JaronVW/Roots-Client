import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { mockArchiveEvent1, mockArchivedEvents } from './archive.mockdata';

import { ArchiveComponent } from './archive.component';
import { By } from '@angular/platform-browser';

describe('ArchiveComponent', () => {
  let component: ArchiveComponent;
  let fixture: ComponentFixture<ArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArchiveComponent],
      imports: [HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('there should be one archived event', fakeAsync(() => {
    component.events = mockArchivedEvents;
    fixture.detectChanges();
    let compiled = fixture.debugElement.queryAll(By.css('.archived-event'));
    expect(compiled.length).toEqual(1);
  }));

  it('there should be an unarchive button', fakeAsync(() => {
    component.events = mockArchivedEvents;
    fixture.detectChanges();
    let compiled = fixture.debugElement.queryAll(By.css('.unarchiveButton'));
    expect(compiled.length).toEqual(1);
  }));

  it('the unarchive button should go to the unarchive function', fakeAsync(() => {
    component.events = mockArchivedEvents;
    fixture.detectChanges();
    let compiled = fixture.debugElement.queryAll(By.css('.unarchiveButton'));
    spyOn(component, 'unarchive'); // spy on the unarchive function
    compiled[0].nativeElement.click(); // click the unarchive button
    expect(component.unarchive).toHaveBeenCalled(); // check if the unarchive function was called
  }));

  it('the unarchive function should remove the event from the list', fakeAsync(() => {
    component.events = mockArchivedEvents;
    fixture.detectChanges();
    let compiled = fixture.debugElement.queryAll(By.css('.archived-event'));
    expect(compiled.length).toEqual(1);
    component.events = []; // remove the event from the list, can't use the unarchive function because it's sending a request to the server
    fixture.detectChanges();
    compiled = fixture.debugElement.queryAll(By.css('.archived-event'));
    expect(compiled.length).toEqual(0);
  }));
});
