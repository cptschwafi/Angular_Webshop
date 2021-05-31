import { TestBed } from '@angular/core/testing';

import { ProductDetailResolverGuard } from './product-detail-resolver.guard';

describe('ProductDetailResolverGuard', () => {
  let guard: ProductDetailResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProductDetailResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
