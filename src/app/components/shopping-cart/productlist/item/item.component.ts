import { CartItem } from './../../../../models/cart-item';
import { CartService } from './../../../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../../../../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() Item: Product = new Product('', ' ', '', '', '');

  constructor(private router: Router, private route: ActivatedRoute,
              private cookie: CookieService) {

   }

  viewDetails(): void
  {
    // save product id in cookie
    this.cookie.set('productid', this.Item.id, 1);

    // route to Detail View
    // this.router.navigate([`../details/` + this.Item.slug()], { relativeTo: this.route });
    this.router.navigate([`../details/` + this.Item.name], {relativeTo: this.route });
  }

  ngOnInit(): void {
  }

}
