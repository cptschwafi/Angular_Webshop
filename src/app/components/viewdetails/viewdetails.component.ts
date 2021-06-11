import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from 'src/app/models/product';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.css']
})
export class ViewdetailsComponent implements OnInit, OnDestroy{


  // RouteSub for Url Path that gets added when going in detail view
  private RouteSub: any ;
  slug: string | undefined ;
  // Item that gets Shown in Detail
  Item: Product = new Product('', ' ', ' ', '', '');

  sizeSelect = new FormGroup({
    selectedSize: new FormControl('', [Validators.required])});


  constructor(private route: ActivatedRoute, private cartservice: CartService,
              private modalService: NgbModal) {}

  ngOnInit(): void {
    // Save the full url to later unsubscribe on destroy
    this.RouteSub = this.route.params.subscribe(params => {
      this.slug = params.slug;
    });
    this.loadItemData();
  }
  ngOnDestroy(): void {
    this.RouteSub.unsubscribe();
  }
  loadItemData(): void
  {
    this.route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.Item = data['data'];
    });
  }

  async handleAddToCart(content: any): Promise<void>
  {
    if (this.sizeSelect.valid)
    {
      const item: CartItem =
      {
        _id : '',
        itemid: this.Item.id,
        name: this.Item.name,
        price: this.Item.price,
        selectedSize: this.sizeSelect.get('selectedSize')?.value,
        ImageUrl: this.Item.ImageUrl,
        quantity: 1
      };
      await this.cartservice.addItemToCart(item);
      this.open(content);
    }
    else {
      this.sizeSelect.markAllAsTouched();
    }

  }


  // Options For Slideshow Carousel
  // tslint:disable-next-line: member-ordering
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    nav: true,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    }
  };

  // MODAL WINDOW LOGIC
  open(content: any): any {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',  windowClass : 'myCustomModal'});
  }
}


