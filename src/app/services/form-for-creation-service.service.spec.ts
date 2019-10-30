import { TestBed } from '@angular/core/testing';

import { FormForCreationServiceService } from './form-for-creation-service.service';

describe('FormForCreationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormForCreationServiceService = TestBed.get(FormForCreationServiceService);
    expect(service).toBeTruthy();
  });
});
