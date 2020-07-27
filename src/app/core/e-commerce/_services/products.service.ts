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
  carttotal: number = 2000;

  constructor(
    private http: HttpClient
  ) {
    this.calcProdCounts()
   }

  //http calls
  // getAllProducts(): Observable<any> {
  //   return this.http.get<any>(this.productsUrl);
  // }


  getAllProducts(skip: number): Observable<any> {
    return this.http.get<any>(this.productUrl + `?skip=${skip}&limit=8`)
  }


  getProductById(productId : string): Observable<any>{
    return this.http.get<any>(this.productUrl + `/${productId}`)
  }




//   public setCartItemDefaultValue(setCartItemDefaultValue) {
//     let products : any;
//     products = JSON.parse(localStorage.getItem("cart_item")) || [];

//     products.push(setCartItemDefaultValue)

//     localStorage.setItem("cart_item", JSON.stringify(products));

//     this.calcProdCounts();
//  }


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

    let item = products.find(o => o.code === data.code)
    if(item) {
      item.quantity =item.quantity + 1 ;
      localStorage.setItem("cart_item", JSON.stringify(item));

    } else {
      data.quantity = 1;
      products.push(data);
      localStorage.setItem("cart_item", JSON.stringify(products));
      this.calcProdCounts();
    }

  }

  public cartProducts() {

  }

  public cartTotal() {
    let products : any;
    products = JSON.parse(localStorage.getItem("cart_item")) || [];
    return products;
  }

  public removeLocalCartProduct(product: any) {
    let products: any = JSON.parse(localStorage.getItem("cart_item"));

    for (let i = 0; i < products.length; i++) {
       if (products[i].productId === product.productId) {
         products.splice(i, 1);
         break;
       }
    }
    localStorage.setItem("cart_item", JSON.stringify(products));
    this.calcProdCounts();
  }

}
