import { DataagreementComponent } from './components/legal/dataagreement/dataagreement.component';
import { ImpressumComponent } from './components/legal/impressum/impressum.component';
import { ViewdetailsComponent } from './components/viewdetails/viewdetails.component';
import { PagenotfoundComponent } from './components/shared/pagenotfound/pagenotfound.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PreCheckoutComponent } from './components/pre-checkout/pre-checkout.component';
import { PaymentConfirmedComponent } from './components/payment-confirmed/payment-confirmed.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartResolverGuard } from './guards/cart-resolver.guard';
import { ProductDetailResolverGuard } from './guards/product-detail-resolver.guard';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'checkout', component: CheckoutComponent, resolve: {data: CartResolverGuard}},
  {path: 'precheckout', component: PreCheckoutComponent, resolve: {data: CartResolverGuard}},
  {path: 'home', component: ShoppingCartComponent},
  {path: 'home/:query', component: ShoppingCartComponent},
  {path: 'confirmed', component: PaymentConfirmedComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'data', component: DataagreementComponent},
  {path: 'details/:slug', component: ViewdetailsComponent, resolve: {data: ProductDetailResolverGuard}},
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
