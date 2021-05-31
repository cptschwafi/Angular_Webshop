import { TestBed } from '@angular/core/testing';

import { CartResolverGuard } from './cart-resolver.guard';

describe('CartResolverGuard', () => {
  let guard: CartResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CartResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
