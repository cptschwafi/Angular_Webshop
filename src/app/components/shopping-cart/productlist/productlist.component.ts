import { MessengerService } from 'src/app/services/messenger.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  productList: Product[] = [];

  constructor(private productService: ProductService, private msg: MessengerService) { }
  ngOnInit(): void {
    this.loadProducts();
    this.handleSubscription();
  }
  async loadProducts(): Promise<void>
  {
    await this.productService.getProducts(location.search).subscribe(data => {
      this.productList = data;
    });
  }

  // Handle Subscription to get informed when an Filters get changed
  handleSubscription(): void
  {
    // tslint:disable-next-line: deprecation
    this.msg.getFilters().subscribe(products => {
      this.loadProducts();
    });
  }


}
