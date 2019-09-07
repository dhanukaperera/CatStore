import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ToastrService } from 'ngx-toastr';
import { TOST_MESSAGES } from 'src/app/shared/tost-messages';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  productsSubscription$: Subscription;
  constructor(private productService: ProductsService, private toastr: ToastrService ) {}

  ngOnInit() {
   this.productsSubscription$ = this.productService.getProducts().subscribe(response => {
     this.products = response['products'];
   }, (error: Response) => {
     if (error.status === 404) {
       this.toastr.error(TOST_MESSAGES.PRODUCTS_NOT_FOUND_ERROR, TOST_MESSAGES.ERROR_TITLE);
     } else {
      this.toastr.error(TOST_MESSAGES.UNEXPECTED_ERROR, TOST_MESSAGES.ERROR_TITLE);
    }
   });
  }

  ngOnDestroy() {
    this.productsSubscription$.unsubscribe();
  }

}
