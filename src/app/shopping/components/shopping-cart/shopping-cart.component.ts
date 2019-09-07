import { Cart } from './../../models/cart.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TOST_MESSAGES } from 'src/app/shared/tost-messages';

import { CartService } from '../../services/cart.service';
import { Product } from './../../models/product.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  shoppingcart: Cart[] = [];

  constructor(private toastr: ToastrService, private cartService: CartService , private router: Router) { }

  ngOnInit() {
    this.updateCart();
  }

  updateCart() {
    this.shoppingcart = this.cartService.getCart();
  }

  addItem(product: Product) {
    const status = this.cartService.addItem(product);
    let message: string = null;
    if (status) {
      message = product.name + TOST_MESSAGES.ADD_TO_CART_BODY_MSG;
      this.toastr.success(message, TOST_MESSAGES.ADD_TO_CART_TITLE_MSG);
      this.updateCart();
      return;
     }
    message = product.name + TOST_MESSAGES.NO_STOCKS_BODY_MSG;
    this.toastr.error(message, TOST_MESSAGES.NO_STOCKS_TITLE_MSG);
  }

  removeItem(product: Product) {
    const status =  this.cartService.removeItem(product);
    const message = product.name + TOST_MESSAGES.REMOVE_ITEM_FROM_CART_BODY;
    if (status) {
      this.toastr.success(message, TOST_MESSAGES.REMOVE_ITEM_FROM_CART_TITLE);
    }
    this.updateCart();
  }

  clear() {
    this.cartService.clearCart();
    this.updateCart();
    this.toastr.success(TOST_MESSAGES.CLEAR_CART_BODY, TOST_MESSAGES.CLEAR_CART_TITLE);
  }

  checkOut() {
    if (!this.shoppingcart) {
      this.toastr.error(TOST_MESSAGES.EMPTY_CART_BODY, TOST_MESSAGES.EMPTY_CART_TITLE);
      return;
    }
    this.cartService.clearCart();
    this.router.navigate(['/order-success']);
  }

}
