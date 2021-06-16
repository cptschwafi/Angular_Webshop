import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
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

  // UI Control Variables
  selectedIndex = -1;

  // RouteSub for Url Path that gets added when going in detail view
  private RouteSub: any ;
  slug: string | undefined ;
  // Item that gets Shown in Detail
  Item: Product = new Product('', ' ', ' ', '', '');

  sizeSelect = new FormGroup({
    selectedSize: new FormControl('', [Validators.required])});


  constructor(private route: ActivatedRoute, private cartservice: CartService,
              private modalService: NgbModal, private elementRef: ElementRef) {}

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

  selectSize(selectedsize: string, index: number): void
  {
    this.Item.selectedSize = selectedsize;
    this.selectedIndex = index;
    this.sizeSelect.disable();
    this.sizeSelect.markAsDirty();
  }

  async handleAddToCart(content: any): Promise<void>
  {
    if (this.sizeSelect.disabled)
    {
      const item: CartItem =
      {
        _id : '',
        itemid: this.Item.id,
        name: this.Item.name,
        price: this.Item.price,
        selectedSize: this.Item.selectedSize,
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
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',  windowClass : 'myCustomModal'})
    .result.then((closedwithbutton) => {
      // Resize Window to 100 vw
      this.elementRef.nativeElement.ownerDocument.body.style.setProperty('overflow-x', 'hidden', 'important');
    }, (dismissed) => {
      // Resize Window to 100 vw
      this.elementRef.nativeElement.ownerDocument.body.style.setProperty('overflow-x', 'hidden', 'important');
    });
  }
}


