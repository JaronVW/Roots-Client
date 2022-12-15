import { TestBed } from '@angular/core/testing';

import { AddeventServiceService } from './addevent-service.service';

describe('AddeventServiceService', () => {
  let service: AddeventServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddeventServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
