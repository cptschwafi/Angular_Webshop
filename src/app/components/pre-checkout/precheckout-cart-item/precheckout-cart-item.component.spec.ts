import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecheckoutCartItemComponent } from './precheckout-cart-item.component';

describe('PrecheckoutCartItemComponent', () => {
  let component: PrecheckoutCartItemComponent;
  let fixture: ComponentFixture<PrecheckoutCartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecheckoutCartItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecheckoutCartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
