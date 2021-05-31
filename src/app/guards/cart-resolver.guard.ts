import { CartService } from './../services/cart.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartResolverGuard implements Resolve<CartItem[]> {
  constructor(private cart: CartService){
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<CartItem[]> | Promise<CartItem[]> | CartItem[] {
    return this.cart.getCartItems();
  }
}
