import { TestBed } from '@angular/core/testing';

import { ElectricianService } from './electrician.service';

describe('ElectricianService', () => {
  let service: ElectricianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectricianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
