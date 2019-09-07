import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TOST_MESSAGES } from 'src/app/shared/tost-messages';

import { CartService } from '../../services/cart.service';
import { Product } from './../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent  {

  @Input('product') product: Product;

  constructor(private toastr: ToastrService, private cartService: CartService) {
  }

  addToCart(product: Product) {
    const status = this.cartService.addItem(product);
    let message;
    if (status) {
      message = product.name + TOST_MESSAGES.ADD_TO_CART_BODY_MSG;
      this.toastr.success(message, TOST_MESSAGES.ADD_TO_CART_TITLE_MSG);
      return;
     }

    message = product.name + TOST_MESSAGES.NO_STOCKS_BODY_MSG;
    this.toastr.error(message, TOST_MESSAGES.NO_STOCKS_TITLE_MSG);
  }

}
