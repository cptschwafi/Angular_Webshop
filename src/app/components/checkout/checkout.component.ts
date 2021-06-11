import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from './../../services/order.service';
import { Component, OnInit, AfterViewChecked, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { CartItem } from 'src/app/models/cart-item';
import { shippingfees} from 'src/app/config/shopconfig';
import { Order } from 'src/app/models/order';

// PAYPAL BUTTON
declare let paypal: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, AfterViewChecked {

  constructor(private order: OrderService, private cart: CartService, private route: ActivatedRoute) { }

  // FORM CONTROLS/ VALIDATION VARIABLES
  // indicates if billing adress checkbox is ticked or not
  billingadress = true;
  availablecountries = ['Deutschland', 'Österreich', 'Schweiz'];
  // indicates if email confirmed button has been successfully pressed
  emailconfirmed = false;

  email = new FormGroup( {email: new FormControl('', [Validators.required, Validators.email])});
  checkoutForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    postalcode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{4,5}')]),
    country: new FormControl('', Validators.required),
    phonenumber: new FormControl('', Validators.required),
  });
  billingdata = new FormGroup({
    billingname: new FormControl('', Validators.required),
    billinglastname: new FormControl('', Validators.required),
    billingstreet: new FormControl('', Validators.required),
    billingcity: new FormControl('', Validators.required),
    billingpostalcode: new FormControl('', Validators.required),
    billingcountry: new FormControl('', Validators.required),
  });

  // Radio button Control
  payment = 'paypal';

  // indicates whether Paypalscript is loaded
  addscript = false;

  // PAYPAL CHECKOUT CONFIG
  payPalConfig =
  {
    env: 'sandbox',
    client: {
      sandbox: 'Ae3Hm2H7b0zR2SzdWOckNv-YtBHyQiJXDv6XNjBaPTyxeZBPr1gwEA0Y7PifUeWqq_MoJjCpMwli3Tsz',
      production: '<your-production-key-here>'
    },
    commit: true,
    payment: (data: any, actions: any) => {
      return actions.payment.create({
        payment: {
          transactions : [
            {amount: {total: this.cartTotal, currency: 'EUR'}}
          ]
        }
      });
    },
    onAuthorize: (data: any, actions: any) => {
      // POST ORDER
      this.order.paypalPayment(actions, this.cartItems, this.cartTotal);
    }
  };

  cartItems: CartItem[] = [];
  cartTotal = 0;
  shipping = shippingfees;



// -------------------------------------------------PAYPAL FUNCTIONS----------------------------------------------
  ngAfterViewChecked(): void {
    if (!this.addscript)
    {
      this.addPaypalScript().then(() =>
      {
        paypal.Button.render(this.payPalConfig, '#paypal-checkout-btn');
      });
    }
  }
  // add Paypal Script to html file
  addPaypalScript(): any
  {
    this.addscript = true;
    return new Promise((resolve, reject) =>
    {
      const scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }
  // shows and hides Paypal button depending on Radio Button setting
  showPaypalButton(): void
  {
    const paypaldisabled = document.getElementById('paypal-disabled');
    if (this.payment === 'paypal')
    {
      if (paypaldisabled)
      {
        paypaldisabled.style.display = 'none';
      }
    }
    else
    {
      if (paypaldisabled)
      {
        paypaldisabled.style.display = 'block';
      }
    }
  }

// ----------------------------------------------VALIDATION FUNCTIONS------------------------------------------

  // Disable or enable Validators for billing adress
  onCheckboxChange(e: any): void{
    if (e.target.checked)
    {
      this.billingdata.disable();
    }
    else
    {
      this.billingdata.enable();
    }
  }
  // validate Email
  validateEmail(): void{
    if (this.email.valid)
    {
      this.emailconfirmed = true;
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      // ADD AUTOTAB LATER   (<any> this.checkoutForm.get('name'))?.nativeElement.focus();
    }
    else if (this.email.invalid){
      this.emailconfirmed = false;
    }
  }


// -----------------------------------------------BASIC FUNCTIONS---------------------------------------------------

  ngOnInit(): void {
    // disable billingdata input and validation as default
    this.billingdata.disable();
    this.loadCartItems();
    // if there are changes made after the email is already confirmed check
    this.email.get('email')?.valueChanges.subscribe(x => {
      if (this.emailconfirmed)
      {
        this.email.updateValueAndValidity();
        this.validateEmail();
      }
    });
  }

  loadCartItems(): void{
    this.route.data.subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.cartItems = data['data'];
      // calculate cart total and convert decimal number to right format
      this.cartTotal = parseFloat( (this.cart.calculateCartTotal(this.cartItems) + shippingfees).toFixed(2));
    });
  }

  // Buy Button clicked
  onSubmit(): void {
    // Validation Passed
    if (this.checkoutForm.valid && this.billingdata.valid || this.checkoutForm.valid && this.billingdata.disabled) {
      const email = this.email.get('email')?.value;
      const name = this.checkoutForm.get('name')?.value;
      const lastname = this.checkoutForm.get('lastname')?.value;
      const street = this.checkoutForm.get('street')?.value;
      const city = this.checkoutForm.get('city')?.value;
      const postalcode = this.checkoutForm.get('postalcode')?.value;
      const country = this.checkoutForm.get('country')?.value;

      let billingname = this.checkoutForm.get('name')?.value;
      let billinglastname = this.checkoutForm.get('lastname')?.value;
      let billingstreet = this.checkoutForm.get('street')?.value;
      let billingcity = this.checkoutForm.get('city')?.value;
      let billingpostalcode = this.checkoutForm.get('postalcode')?.value;
      let billingcountry = this.checkoutForm.get('country')?.value;

      if (this.billingdata.enabled)
      {
        billingname = this.billingdata.get('billingname')?.value;
        billinglastname = this.billingdata.get('billinglastname')?.value;
        billingstreet = this.billingdata.get('billingstreet')?.value;
        billingcity = this.billingdata.get('billingcity')?.value;
        billingpostalcode = this.billingdata.get('billingpostalcode')?.value;
        billingcountry = this.billingdata.get('billingcountry')?.value;
      }
      const order = new Order(email, name + ' ' + lastname, street, city, postalcode, country,
        billingname + ' ' + billinglastname, billingstreet, billingcity, billingpostalcode, billingcountry,
        this.cartTotal, this.cartItems, new Date().toLocaleString());

      // Place Order
      this.order.bankTransferPayment(order);
    }
    // Validation not passed
    else {
      this.checkoutForm.markAllAsTouched();
      if (this.billingdata.enabled)
      {
        this.billingdata.markAllAsTouched();
      }
    }
  }
}
