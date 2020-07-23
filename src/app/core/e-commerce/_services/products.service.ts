import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductModel } from '../_models/product.model';

@Injectable()
export class ProductService {


  private productsUrl = "https://janasoft-store-api.herokuapp.com/products?skip=0&limit=8";
  private productUrl = "https://janasoft-store-api.herokuapp.com/products";


  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.productsUrl);
  }

  getProductById(productId : string): Observable<any>{
    return this.http.get<any>(this.productUrl + `/${productId}`)
  }
}
