import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataagreementComponent } from './dataagreement.component';

describe('DataagreementComponent', () => {
  let component: DataagreementComponent;
  let fixture: ComponentFixture<DataagreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataagreementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataagreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
