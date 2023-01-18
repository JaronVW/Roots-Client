import { TestBed } from '@angular/core/testing';

import { VerifyaccountService } from './verifyaccount.service';

describe('VerifyaccountService', () => {
  let service: VerifyaccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifyaccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
