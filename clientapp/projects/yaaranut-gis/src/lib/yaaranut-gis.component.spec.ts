import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YaaranutGisComponent } from './yaaranut-gis.component';

describe('YaaranutGisComponent', () => {
  let component: YaaranutGisComponent;
  let fixture: ComponentFixture<YaaranutGisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YaaranutGisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YaaranutGisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
