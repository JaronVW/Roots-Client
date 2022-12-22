import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AddediteventComponent } from './addeditevent.component';

describe('AddeventComponent', () => {
  let component: AddediteventComponent;
  let fixture: ComponentFixture<AddediteventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddediteventComponent],
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddediteventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('form invalid when empty', fakeAsync(() => {
    spyOn(component, 'validate');

    let button = fixture.debugElement.nativeElement.querySelector('.submitButton');
    button.click();
    tick();
    expect(component.validate).toHaveBeenCalled();
  }));
});
