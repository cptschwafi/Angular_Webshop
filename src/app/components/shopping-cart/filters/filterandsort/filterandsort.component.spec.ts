import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterandsortComponent } from './filterandsort.component';

describe('FilterandsortComponent', () => {
  let component: FilterandsortComponent;
  let fixture: ComponentFixture<FilterandsortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterandsortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterandsortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
