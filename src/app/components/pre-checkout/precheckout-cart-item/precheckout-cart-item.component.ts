import { CartItem } from './../../../models/cart-item';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-precheckout-cart-item',
  templateUrl: './precheckout-cart-item.component.html',
  styleUrls: ['./precheckout-cart-item.component.css']
})
export class PrecheckoutCartItemComponent implements OnInit {

  @Input() cartItem: CartItem = new CartItem('', '', '', 0, '', '', 0);
  @Output() DeleteItem: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  constructor() { }

  ngOnInit(): void {
  }
  DeleteItemFromCart(item: CartItem): void
  {
    this.DeleteItem.emit(item);
  }

}
