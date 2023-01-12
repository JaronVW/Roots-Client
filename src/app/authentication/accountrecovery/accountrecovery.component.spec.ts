import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountrecoveryComponent } from './accountrecovery.component';

describe('AccountrecoveryComponent', () => {
  let component: AccountrecoveryComponent;
  let fixture: ComponentFixture<AccountrecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountrecoveryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountrecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
