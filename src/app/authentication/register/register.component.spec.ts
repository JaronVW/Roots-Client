import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        NgMultiSelectDropDownModule,
        NgbCollapseModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('form')).toBeTruthy();
  });

  it('should have a firstName input', () => {
    let compiled = fixture.debugElement.queryAll(By.css('#firstNameInput'));
    expect(compiled.length).toEqual(1);
  });

  it('should have a lastName input', () => {
    let compiled = fixture.debugElement.queryAll(By.css('#lastNameInput'));
    expect(compiled.length).toEqual(1);
  });

  it('should have a email input', () => {
    let compiled = fixture.debugElement.queryAll(By.css('#emailInput'));
    expect(compiled.length).toEqual(1);
  });

  it('should have a password input', () => {
    let compiled = fixture.debugElement.queryAll(By.css('#passwordInput'));
    expect(compiled.length).toEqual(1);
  });

  it('should have a confirmPassword input', () => {
    let compiled = fixture.debugElement.queryAll(By.css('#repeatPasswordInput'));
    expect(compiled.length).toEqual(1);
  });
});
