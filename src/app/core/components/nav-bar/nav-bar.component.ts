import { Component, OnInit } from '@angular/core';

import { CartService } from '../../../shopping/services/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit() {
     this.cartService.getItemCount();
  }

}
