import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { OrderSucessComponent } from './shopping/components/order-sucess/order-sucess.component';
import { ProductDetailsComponent } from './shopping/components/product-details/product-details.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
import { ShoppingModule } from './shopping/shopping.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    ShoppingModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'product/:name', component: ProductDetailsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'order-success', component: OrderSucessComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
