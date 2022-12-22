import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventService } from '../event.service';

import { ListeventsComponent } from './listevents.component';

describe('ListeventsComponent', () => {
  //debuging over here
  let component: ListeventsComponent;
  let fixture: ComponentFixture<ListeventsComponent>;
  let service = EventService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeventsComponent],
      imports: [HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
