import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiewindowComponent } from './cookiewindow.component';

describe('CookiewindowComponent', () => {
  let component: CookiewindowComponent;
  let fixture: ComponentFixture<CookiewindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookiewindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiewindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
