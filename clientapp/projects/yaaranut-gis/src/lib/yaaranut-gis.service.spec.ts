import { TestBed } from '@angular/core/testing';

import { YaaranutGisService } from './yaaranut-gis.service';

describe('YaaranutGisService', () => {
  let service: YaaranutGisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YaaranutGisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
