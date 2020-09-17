import { TestBed } from '@angular/core/testing';

import { LecternUtilityService } from './lectern-utility.service';

describe('LecternUtilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LecternUtilityService = TestBed.get(LecternUtilityService);
    expect(service).toBeTruthy();
  });
});
