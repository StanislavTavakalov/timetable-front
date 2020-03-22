import { TestBed } from '@angular/core/testing';

import { SeverityService } from './severity.service';

describe('SeverityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeverityService = TestBed.get(SeverityService);
    expect(service).toBeTruthy();
  });
});
