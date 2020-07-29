import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ProductService {

  //api endpoints

  private productUrl = "https://janasoft-store-api.herokuapp.com/products";
  private OrderUrl = "https://janasoft-store-api.herokuapp.com/users";


  //variables
  localStorageCartProducts: any;
  cartCount: number = 0;
  carttotal: number = 2000;

  value : []




  constructor(
    private http: HttpClient
  ) {
    this.calcProdCounts()
    // this.setCartItemDefaultValue(this.value)
   }

  //http calls

  getAllProducts(skip: number): Observable<any> {
    return this.http.get<any>(this.productUrl + `?skip=${skip}&limit=8`)
  }


  getProductById(productId : string): Observable<any>{
    return this.http.get<any>(this.productUrl + `/${productId}`)
  }


  postOrder(userId: string, order): Observable<any> {
    const userToken = localStorage.getItem("token");
    const httpHeaders = new HttpHeaders({
      Authorization: userToken
    });

    return this.http.post<any>(this.OrderUrl + `/${userId}/orders` , order, {headers: httpHeaders})
  }

  getOrders(userId: string): Observable<any> {
    const userToken = localStorage.getItem("token");
    const httpHeaders = new HttpHeaders({
      Authorization: userToken
    });
    return this.http.get<any>(this.OrderUrl + `/${userId}/orders?skip=0&limit=10`, {headers: httpHeaders})
  }


 // service methods

   setCartItemDefaultValue(setCartItemDefaultValue) {
    let products : any;
    products = JSON.parse(localStorage.getItem("cart_item")) || [];
    let found = products.some(function (el, index) {
       if(el.name == setCartItemDefaultValue.name){
          return  true;
       }
    });
    if (!found) { products.push(setCartItemDefaultValue); }

    localStorage.setItem("cart_item", JSON.stringify(products));
    this.calcProdCounts();
 }


  //localstorage sum products
   calcProdCounts() {
    this.localStorageCartProducts = null;
    this.localStorageCartProducts = JSON.parse(localStorage.getItem("cart_item")) || [];
    this.cartCount = +((this.localStorageCartProducts).length);
  }


  // localstorage add new product to cart
   addToCart(data: any) {
  //   let products : any
  //   products = JSON.parse(localStorage.getItem("cart_item")) || [];




  //   let found = products.some(function (el, index) {
  //     if(el.name == data.name){
  //        if(!data.quantity) { data.quantity = 1}
  //        products[index]['quantity'] = data.quantity;
  //        return  true;
  //     }
  //  });

  //  if (!found) { products.push(data); }

  //  localStorage.setItem("cart_item", JSON.stringify(products));
  //  this.calcProdCounts();

  let products : any
  products = JSON.parse(localStorage.getItem("cart_item")) || [];


    let item = products.some(function (el, index) {
      if(el.name == data.name) {
        el.quantity = data.quantity + 1;
        localStorage.setItem("cart_item", JSON.stringify(el));
        return true;
      }
    })
    if(!item) {
      data.quantity = 1;
      products.push(data);
      localStorage.setItem("cart_item", JSON.stringify(products));
      this.calcProdCounts();
    }


  }

   cartProducts() {

  }

   cartTotal() {
    let products : any;
    products = JSON.parse(localStorage.getItem("cart_item")) || [];
    return products;
  }

   removeLocalCartProduct(product: any) {
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
