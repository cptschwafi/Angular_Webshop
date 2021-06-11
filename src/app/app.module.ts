import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { FiltersComponent } from './components/shopping-cart/filters/filters.component';
import { ProductlistComponent } from './components/shopping-cart/productlist/productlist.component';
import { ItemComponent } from './components/shopping-cart/productlist/item/item.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PagenotfoundComponent } from './components/shared/pagenotfound/pagenotfound.component';
import { PreCheckoutComponent } from './components/pre-checkout/pre-checkout.component';
import { PrecheckoutCartItemComponent } from './components/pre-checkout/precheckout-cart-item/precheckout-cart-item.component';
import { FormsModule } from '@angular/forms';
import { PaymentConfirmedComponent } from './components/payment-confirmed/payment-confirmed.component';
import { ViewdetailsComponent } from './components/viewdetails/viewdetails.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactComponent } from './components/contact/contact.component';
import { CookieService } from 'ngx-cookie-service';
import { FilterandsortComponent } from './components/shopping-cart/filters/filterandsort/filterandsort.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import { CookiewindowComponent } from './components/shared/cookiewindow/cookiewindow.component';
import { ImpressumComponent } from './components/legal/impressum/impressum.component';
import { DataagreementComponent } from './components/legal/dataagreement/dataagreement.component';
import { ScrollUpButtonComponent } from './components/shared/scroll-up-button/scroll-up-button.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    ShoppingCartComponent,
    FiltersComponent,
    ProductlistComponent,
    ItemComponent,
    CheckoutComponent,
    PagenotfoundComponent,
    PreCheckoutComponent,
    PrecheckoutCartItemComponent,
    PaymentConfirmedComponent,
    ViewdetailsComponent,
    ContactComponent,
    FilterandsortComponent,
    CookiewindowComponent,
    ImpressumComponent,
    DataagreementComponent,
    ScrollUpButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
