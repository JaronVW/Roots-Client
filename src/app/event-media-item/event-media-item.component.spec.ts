import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMediaItemComponent } from './event-media-item.component';

describe('EventMediaItemComponent', () => {
  let component: EventMediaItemComponent;
  let fixture: ComponentFixture<EventMediaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventMediaItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventMediaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // figure out imports (dependencies) of this component (breaks on this.media.includes, says media is undefined)
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
