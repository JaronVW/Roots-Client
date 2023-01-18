import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
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

  it('should have a email input', () => {
    let compiled = fixture.debugElement.queryAll(By.css('#emailInput'));
    expect(compiled.length).toEqual(1);
  });

  it('should have a password input', () => {
    let compiled = fixture.debugElement.queryAll(By.css('#passwordInput'));
    expect(compiled.length).toEqual(1);
  });

  it('should have a login button', () => {
    let compiled = fixture.debugElement.queryAll(By.css('.login-button'));
    expect(compiled.length).toEqual(1);
  });

  it('should have a register button', () => {
    let compiled = fixture.debugElement.queryAll(By.css('#registerLink'));
    expect(compiled.length).toEqual(1);
  });

  it('when the login button is clicked, the login method should be called', () => {
    spyOn(component, 'validate');
    let compiled = fixture.debugElement.queryAll(By.css('.login-button'));
    compiled[0].nativeElement.click();
    expect(component.validate).toHaveBeenCalled();
  });

  it('when login button is clicked, with invalid form, an error message should be given', () => {
    let compiled = fixture.debugElement.queryAll(By.css('.login-button'));
    compiled[0].nativeElement.click();
    fixture.detectChanges();
    compiled = fixture.debugElement.queryAll(By.css('.userError'));
    expect(compiled.length).toEqual(1);
  });
});
