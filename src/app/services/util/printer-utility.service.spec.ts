import { TestBed } from '@angular/core/testing';

import { PrinterUtilityService } from './printer-utility.service';

describe('PrinterUtilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrinterUtilityService = TestBed.get(PrinterUtilityService);
    expect(service).toBeTruthy();
  });
});
