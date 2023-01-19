import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VerifyaccountService } from './verifyaccount.service';

describe('VerifyaccountService', () => {
  let service: VerifyaccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VerifyaccountService],
    });
    service = TestBed.inject(VerifyaccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
