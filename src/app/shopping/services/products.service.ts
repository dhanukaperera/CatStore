import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  private url = 'http://cat-store-api.frostdigital.se/api-v1';

  getProducts() {
    return this.http.get(this.url);
  }

}
