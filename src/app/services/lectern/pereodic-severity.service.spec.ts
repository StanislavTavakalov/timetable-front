import { TestBed } from '@angular/core/testing';

import { PereodicSeverityService } from './pereodic-severity.service';

describe('PereodicSeverityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PereodicSeverityService = TestBed.get(PereodicSeverityService);
    expect(service).toBeTruthy();
  });
});
