import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AddediteventComponent } from './addeditevent.component';

describe('AddeventComponent', () => {
  let component: AddediteventComponent;
  let fixture: ComponentFixture<AddediteventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddediteventComponent],
      imports: [HttpClientModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddediteventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('')
});
