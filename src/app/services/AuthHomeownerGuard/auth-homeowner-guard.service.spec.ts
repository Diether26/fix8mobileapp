import { TestBed } from '@angular/core/testing';

import { AuthHomeownerGuardService } from './auth-homeowner-guard.service';

describe('AuthHomeownerGuardService', () => {
  let service: AuthHomeownerGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthHomeownerGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
