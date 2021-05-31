import { CookieService } from 'ngx-cookie-service';
import { ProductService } from './../services/product.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailResolverGuard implements Resolve<Product> {
  constructor(private product: ProductService, private cookie: CookieService){
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Product> | Promise<Product> | Product {
    return this.product.getProduct(this.cookie.get('productid'));
  }

}
