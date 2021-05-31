import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  showbackground = true;

  constructor() { }
   ngOnInit(): void {}
   hideBackground(): void
   {
     this.showbackground = !this.showbackground;
   }
}


