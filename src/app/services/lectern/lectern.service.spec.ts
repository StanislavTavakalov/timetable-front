import { TestBed } from '@angular/core/testing';

import { LecternService } from './lectern.service';

describe('LecternService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LecternService = TestBed.get(LecternService);
    expect(service).toBeTruthy();
  });
});
