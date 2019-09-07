import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { OrderSucessComponent } from './components/order-sucess/order-sucess.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CartService } from './services/cart.service';
import { ProductsService } from './services/products.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true,
      positionClass: 'toast-top-center'
    }),
    RouterModule.forChild([]),
  ],
  declarations: [
    ProductsComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    OrderSucessComponent,
  ],
  providers: [
    ProductsService,
    CartService
  ]
})
export class ShoppingModule { }
