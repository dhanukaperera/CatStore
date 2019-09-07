import { Injectable } from '@angular/core';

import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart[] = [];
  private LOCAL_STORAGE_KEY = 'shopping';

  constructor() { }

  private updateCart() {
    this.cart = JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY));
  }

  private isStockEmpty(item: Product): Boolean {
    this.updateCart();
    if (!this.cart && item.stock > 0) {return true; }
    const newProduct  = this.cart.find(cartItem => cartItem.product.name === item.name);
    return (!newProduct && item.stock > 0) ?  true : (newProduct.qty >= newProduct.product.stock) ? false : true;
  }

  addItem(item: Product): boolean {

    if (!this.isStockEmpty(item)) {
      return false;
    }

    this.updateCart();
    if (!this.cart) {
      this.cart = [];
      const newItem: Cart = { product: item, qty: 1 };
      this.cart.push(newItem);
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.cart));
      return true;
    }

    const newProduct: Cart = this.cart.find(product => product.product.name === item.name);

    if (newProduct) {
      newProduct.qty = newProduct.qty + 1;
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.cart));
      return true;
    }

    const existingProduct: Cart = { product: item, qty: 1 };
    this.cart.push(existingProduct);
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.cart));
    return true;
  }

  getCart(): Cart[] {
    this.updateCart();
    return this.cart;
  }

  getItemCount(): Number {
    this.updateCart();
    return (!this.cart) ?  0 : this.cart.reduce((count, cartItem) => count + cartItem.qty, 0);
  }

  getTotalPrice(): Number {
    this.updateCart();
    return (!this.cart) ?  0 :  this.cart.reduce((totalPrice, cartItem) => totalPrice + cartItem.qty * cartItem.product.price, 0);
  }

  removeItem(item: Product): Boolean {
    this.updateCart();
    if (!this.cart) {return false; }

    const removeProduct =  this.cart.find(cartItem => cartItem.product.name === item.name);

    if (removeProduct) {
      removeProduct.qty = removeProduct.qty - 1;
      localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.cart));
      return true;
    }
  }

  clearCart() {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, null);
    this.cart = [];
  }
}
