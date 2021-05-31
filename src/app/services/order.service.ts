import { ordersUrl } from './../config/apiconfig';
import { MessengerService } from './messenger.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cart-item';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private cookie: CookieService, private cartService: CartService,
              private router: Router, private route: ActivatedRoute, private msg: MessengerService) { }

  paypalPayment(actions: any,  cartItems: CartItem[], cartTotal: number): Promise<void> {
    return actions.payment.execute().then(async (payment: any) =>
    {
      // Fetching Data From Paypal Checkout
      const CustomerName = payment.payer.payer_info.shipping_address.recipient_name;
      const ShippingAddress = payment.payer.payer_info.shipping_address.line1 + ' ' + payment.payer.payer_info.shipping_address.line2 ;
      const city = payment.payer.payer_info.shipping_address.city;
      const PostalCode = payment.payer.payer_info.shipping_address.postal_code;
      const Country = payment.payer.payer_info.shipping_address.country_code;
      const email = payment.payer.payer_info.email;
      // create order
      const order = new Order(email, CustomerName , ShippingAddress, city, PostalCode, Country,
         CustomerName , ShippingAddress, city, PostalCode, Country,
      cartTotal, cartItems, new Date().toLocaleString());

      this.createOrder(order);

      this.finishCheckout();
    });
  }
  bankTransferPayment(order: Order): void
  {
    this.createOrder(order);
    this.finishCheckout();
  }

  async finishCheckout(): Promise<void>{
    // After Successfull Payment, delete Cart and navigate to Confirmation Page
    await this.cartService.deleteAllCartItems(this.cookie.get('cartid'));
    this.msg.sendMsg();
    this.router.navigate([`../confirmed`], { relativeTo: this.route });
  }

  // Post Order to REST API
  createOrder(order: Order ): void
  {
    const orderjson = JSON.stringify(order);
    this.http.post<any>(ordersUrl,
    orderjson, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })})
  // tslint:disable-next-line: deprecation
  .subscribe(data => {});
  }
}
