import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedsCollectComponent } from './seeds-collect.component';

describe('SeedsCollectComponent', () => {
  let component: SeedsCollectComponent;
  let fixture: ComponentFixture<SeedsCollectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeedsCollectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeedsCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
