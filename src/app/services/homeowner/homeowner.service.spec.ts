import { TestBed } from '@angular/core/testing';

import { HomeownerService } from './homeowner.service';

describe('HomeownerService', () => {
  let service: HomeownerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeownerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
