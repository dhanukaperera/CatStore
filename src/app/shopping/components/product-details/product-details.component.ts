import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TOST_MESSAGES } from 'src/app/shared/tost-messages';

import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  name: string;
  product: Product = {};
  productsSubscription$: Subscription;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductsService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
    this.productsSubscription$ = this.productService.getProducts().subscribe(resp => {
      let products: Product[];
      products  = resp['products'];
      this.product = products.find(product => product.name === this.name);
    }, (error: Response) => {
      if (error.status === 404) {
        alert('Error : Products not found!');
      } else {
        alert('Error : Unexpected Error occored!');
      }
    });
  }

  ngOnDestroy() {
    this.productsSubscription$.unsubscribe();
  }

  addToCart(product: Product) {
    const status = this.cartService.addItem(product);
    let message;
    if (status) {
      message = this.product.name + TOST_MESSAGES.ADD_TO_CART_BODY_MSG;
      this.toastr.success(message, TOST_MESSAGES.ADD_TO_CART_TITLE_MSG);
      return;
     }

    message = this.product.name + TOST_MESSAGES.NO_STOCKS_BODY_MSG;
    this.toastr.error(message, TOST_MESSAGES.NO_STOCKS_TITLE_MSG);
  }

}
