import { TestBed } from '@angular/core/testing';

import { EditableModeService } from './editable-mode.service';

describe('EditableModeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditableModeService = TestBed.get(EditableModeService);
    expect(service).toBeTruthy();
  });
});
