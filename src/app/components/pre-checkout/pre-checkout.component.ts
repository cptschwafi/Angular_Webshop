import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-pre-checkout',
  templateUrl: './pre-checkout.component.html',
  styleUrls: ['./pre-checkout.component.css']
})
export class PreCheckoutComponent implements OnInit
{
  cartItems: CartItem[] = [];
  cartTotal = 0;

  constructor(private cartService: CartService, private cookie: CookieService, private msg: MessengerService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.cookie.check('cartid'))
    {
      // reset cookie expiration to 14 days so the cookie wont run out while payment
      this.cookie.set('cartid', this.cookie.get('cartid'), 14);
      this.loadCartItemsFromResolver();
    }
    this.handleSubscription();
  }

  async loadCartItems(): Promise<void>{
    // tslint:disable-next-line: deprecation
     await this.cartService.getCartItems().subscribe(cartitems => {
        this.cartItems = cartitems;
        this.cartTotal = this.cartService.calculateCartTotal(this.cartItems);
      });
  }
  loadCartItemsFromResolver(): void{
    this.route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.cartItems = data['data'];
      this.cartTotal = this.cartService.calculateCartTotal(this.cartItems);
    });
  }

   // removes item from shopping cart
   async removeItemfromCart(item: CartItem): Promise<void>
   {
    await this.cartService.removeItemfromCart(item._id);
   }

  // Handle Subscription to get informed when an item gets added/removed from cart
  handleSubscription(): void
  {
    // tslint:disable-next-line: deprecation
    this.msg.getMsg().subscribe(product => {
      this.loadCartItems();
    });
  }
}
