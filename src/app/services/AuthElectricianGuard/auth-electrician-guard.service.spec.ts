import { TestBed } from '@angular/core/testing';

import { AuthElectricianGuardService } from './auth-electrician-guard.service';

describe('AuthElectricianGuardService', () => {
  let service: AuthElectricianGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthElectricianGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
