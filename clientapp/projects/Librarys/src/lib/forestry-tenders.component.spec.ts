import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForestryTendersComponent } from './forestry-tenders.component';

describe('ForestryTendersComponent', () => {
  let component: ForestryTendersComponent;
  let fixture: ComponentFixture<ForestryTendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForestryTendersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForestryTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
