import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

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

  it('form invalid when empty', fakeAsync(() => {
    spyOn(component, 'validate');

    let button = fixture.debugElement.nativeElement.querySelector('.submitButton');
    button.click();
    tick();
    expect(component.validate).toHaveBeenCalled();
  }));
});
