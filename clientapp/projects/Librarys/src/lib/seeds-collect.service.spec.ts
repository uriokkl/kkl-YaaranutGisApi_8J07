import { TestBed } from '@angular/core/testing';

import { SeedsCollectService } from './seeds-collect.service';

describe('SeedsCollectService', () => {
  let service: SeedsCollectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeedsCollectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
