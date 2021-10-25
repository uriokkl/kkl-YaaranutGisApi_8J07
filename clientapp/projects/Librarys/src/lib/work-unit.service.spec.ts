import { TestBed } from '@angular/core/testing';

import { WorkUnitService } from './work-unit.service';

describe('WorkUnitService', () => {
  let service: WorkUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkUnitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
