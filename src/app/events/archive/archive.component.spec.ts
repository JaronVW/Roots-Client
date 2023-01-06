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
    console.log(component.events);
    fixture.detectChanges();
    console.log(fixture.debugElement.nativeElement);
    const compiled = fixture.debugElement.queryAll(By.css('.archived-event-row'));
    console.log(compiled);
    // console.log(compiled.querySelector('.archived-events-row'));
    // console.log(compiled.querySelector('.archived-event'));
    // expect(compiled.querySelector('.archived-events-row')).toContain(compiled.querySelector('.archived-event'));
  }));
});
