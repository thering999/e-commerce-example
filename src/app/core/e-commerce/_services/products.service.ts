import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

  // private api endpoints
  private productsUrl = "https://janasoft-store-api.herokuapp.com/products?skip=0&limit=8"

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<any>(this.productsUrl);
  }

}
