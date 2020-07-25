import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

  //api endpoints
  private productsUrl = "https://janasoft-store-api.herokuapp.com/products?skip=0&limit=8";
  private productUrl = "https://janasoft-store-api.herokuapp.com/products";

  //variables
  localStorageCartProducts: any;
  cartCount: number = 0;

  constructor(
    private http: HttpClient
  ) {

   }

  //http calls
  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.productsUrl);
  }

  getProductById(productId : string): Observable<any>{
    return this.http.get<any>(this.productUrl + `/${productId}`)
  }




  public setCartItemDefaultValue(setCartItemDefaultValue) {
    let products : any;
    products = JSON.parse(localStorage.getItem("cart_item")) || [];

    products.push(setCartItemDefaultValue)

    localStorage.setItem("cart_item", JSON.stringify(products));

    this.calcProdCounts();
 }


  //localstorage sum products
  public calcProdCounts() {
    this.localStorageCartProducts = null;
    this.localStorageCartProducts = JSON.parse(localStorage.getItem("cart_item")) || [];
    this.cartCount = +((this.localStorageCartProducts).length);
  }


  // localstorage add new product to cart
  public addToCart(data: any) {
    let products : any
    products = JSON.parse(localStorage.getItem("cart_item")) || [];

    let item = products.find(o => o.name === data.name)
    if(item) {
      alert('Item is in cart')
      return;
    }
    products.push(data);

    localStorage.setItem("cart_item", JSON.stringify(products));
    this.calcProdCounts();

  }

}
