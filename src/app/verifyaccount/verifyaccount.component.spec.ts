import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { VerifyaccountComponent } from './verifyaccount.component';

describe('VerifyaccountComponent', () => {
  let component: VerifyaccountComponent;
  let fixture: ComponentFixture<VerifyaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifyaccountComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
