import { TestBed } from '@angular/core/testing';

import { DeaneryService } from './deanery.service';

describe('DeaneryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeaneryService = TestBed.get(DeaneryService);
    expect(service).toBeTruthy();
  });
});
