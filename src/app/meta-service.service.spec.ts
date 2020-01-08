import { TestBed } from '@angular/core/testing';

import { MetaServiceService } from './meta-service.service';

describe('MetaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetaServiceService = TestBed.get(MetaServiceService);
    expect(service).toBeTruthy();
  });
});
