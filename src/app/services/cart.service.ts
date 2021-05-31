import { MessengerService } from './messenger.service';
import { CartItem } from 'src/app/models/cart-item';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { cartUrl } from '../config/apiconfig';
import { CookieService } from 'ngx-cookie-service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // ID of the cart
  CartID = this.cookie.get('cartid');
  cartexists = false;

  constructor(private http: HttpClient, private cookie: CookieService, private msg: MessengerService) { }

  getCartItems(): Observable <CartItem[]>{
   return this.http.get<CartItem[]>(cartUrl + '/' + this.CartID).pipe(catchError(this.handleError));
  }

  // tslint:disable-next-line: typedef
  handleError(error: HttpErrorResponse) {

    this.cookie.delete('cartid');

    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    }
    else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


  async addItemToCart(item: CartItem): Promise<void>
  {

    // if cart doesnt exist create one
    if (!this.cookie.check('cartid') || !await this.checkIfCartExists(this.cookie.get('cartid')))
    {
      await this.createCart(item);
    }

    // getting Req message into right format
    const itemjson = '{"CartItems":' + JSON.stringify(item) + '}';

    return await this.http.patch<any>(cartUrl + '/add/' + this.CartID, itemjson, {headers : new HttpHeaders({'Content-Type': 'application/json'})})
    .toPromise()
    .then((data: any) => {
      // sendMsg to Load Items
      this.msg.sendMsg();
     })
    .catch(err => {
      // reset Cart cookie
      this.cookie.delete('cartid');

      console.log('error when adding Product to DB', err);
      });
  }

  async removeItemfromCart(itemobjectid: string): Promise<void>
  {
    // DB Id of the item
    itemobjectid = '{"_id":' + JSON.stringify(itemobjectid) + '}';

    return await this.http.patch<any>(cartUrl + '/remove/' + this.CartID , itemobjectid, {headers : new HttpHeaders({'Content-Type': 'application/json'})})
   .toPromise()
   .then((data: any) => {
    // sendMsg to Refresh Cart
    this.msg.sendMsg();
   })
   .catch(err => {
    console.log('Error when removing item from DB', err);
    });
  }

 createCart(item: CartItem): Promise<void>
  {
    return this.http.post<any>(cartUrl, '{}' , {headers : new HttpHeaders({'Content-Type': 'application/json'})})
    .toPromise()
    .then((data: any) => {
    // save cart id in cookie
    this.cookie.set('cartid', data._id, 365);
    this.CartID = this.cookie.get('cartid');
    })
    .catch(err => {
    console.log('Error when creating Cart', err);
    });
  }
  // Deletes all cart items
  async deleteAllCartItems(id: string): Promise<void>
  {
    return await this.http.delete<any>(cartUrl + '/' + id)
    .toPromise()
    .then((data: any) => {
      // sendMsg to Refresh Cart
      this.msg.sendMsg();
    })
    .catch(err => {
     console.log('Error when creating Cart', err);
     });
  }

   async checkIfCartExists(id: string): Promise<boolean>
  {
    return await this.http.get<boolean>(cartUrl + '/check/' + id).toPromise().then(
      data => {
        return data;
      }
    );
  }

  // Calculates Total of all Cart Items
  calculateCartTotal(cartItems: CartItem[]): number
  {
    let cartTotal = 0;
    cartItems.forEach(cartitem => {
      cartTotal += cartitem.price * cartitem.quantity;
    });
    return cartTotal;

  }
}
