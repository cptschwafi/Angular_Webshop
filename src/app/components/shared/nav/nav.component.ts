import { Router } from '@angular/router';
import { CartService } from './../../../services/cart.service';
import { MessengerService } from './../../../services/messenger.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private msg: MessengerService, private cartService: CartService, private cookie: CookieService,
              private router: Router) { }
  cartItems: CartItem[] = [];

  ngOnInit(): void {
    if (this.cookie.check('cartid'))
    {
      this.loadCartItems();
    }
    this.handleSubscription();
  }

    // Handle Subscription to get informed when an item gets added/removed from cart
    handleSubscription(): void
    {
      // tslint:disable-next-line: deprecation
      this.msg.getMsg().subscribe(product => {
        this.loadCartItems();
      });

    }

    loadCartItems(): void{
      // tslint:disable-next-line: deprecation
        this.cartService.getCartItems().subscribe(cartitems => {
          this.cartItems = cartitems;
        });
    }

    toggleBurgerMenu(): void
    {
      if (window.location.href.split('?')[0] === 'http://localhost:4200/home'){
        this.msg.BurgerMenuToggle();
      }
      else{
        this.router.navigate([`/home`]);
      }
    }

    async NavigateHome(): Promise<void>{
      await this.router.navigate(['home/']);
      this.msg.filtersChanged();
    }

}
