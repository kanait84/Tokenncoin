import { TestBed } from '@angular/core/testing';

import { ApiservicesService } from './apiservices.service';

describe('ApiservicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiservicesService = TestBed.get(ApiservicesService);
    expect(service).toBeTruthy();
  });
});
