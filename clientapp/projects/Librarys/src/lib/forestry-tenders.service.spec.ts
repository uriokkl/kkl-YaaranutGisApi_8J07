import { TestBed } from '@angular/core/testing';

import { ForestryTendersService } from './forestry-tenders.service';

describe('ForestryTendersService', () => {
  let service: ForestryTendersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForestryTendersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
