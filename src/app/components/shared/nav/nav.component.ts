import { Router } from '@angular/router';
import { CartService } from './../../../services/cart.service';
import { MessengerService } from './../../../services/messenger.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartItem } from 'src/app/models/cart-item';
import { baseUrl } from 'src/app/config/frontendconfig';

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
      // burger menu hide/show or scroll to top
      if (window.location.href.split('?')[0] === baseUrl + '/home'){
        this.msg.BurgerMenuToggle();
        this.scrollToTop();
      }
      else{
        this.router.navigate([`/home`]);
      }
    }
// navigate to home page
    async NavigateHome(): Promise<void>{
      await this.router.navigate(['home/']);
      this.msg.filtersChanged();
    }
// scroll to top of the page
    scrollToTop(): void {
      (function smoothscroll(): void {
          const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
              window.requestAnimationFrame(smoothscroll);
              window.scrollTo(0, currentScroll - (currentScroll / 8));
          }
      })();
    }
}
