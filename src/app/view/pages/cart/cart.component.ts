import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/core/e-commerce';
import { Router } from '@angular/router';
import { AppState } from 'src/app/core/reducers';
import { Store, select } from '@ngrx/store';
import { currentUser, isLoggedIn } from 'src/app/core/auth/_selectors/auth.selectors';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/auth/_models/user.model';
import { tap, subscribeOn, map } from 'rxjs/operators';
import { AuthNoticeService } from 'src/app/core/auth/auth-notice/auth-notice.service';

export interface PorductsInCart {
  name: string;
  product: string;
  price: string;
  quantity: number;
  total: string
}



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {

  displayedColumns: string[] = ['product', 'name', 'price', 'quantity', 'total', 'clear'];

  isloggedIn$ : Observable<boolean>
  user$ : any
  products$: any;
  id: any;
  @Input() currency: string;

  constructor(
    public productService: ProductService,
    public router: Router,
    public store : Store<AppState>,
    public authNoticeService : AuthNoticeService
  ) { }

  ngOnInit(): void {

      this.products$ = this.productService.cartTotal();
      this.store.pipe(select(currentUser)).subscribe(res => {this.user$ = res});
      this.store.pipe(select(isLoggedIn)).subscribe(res => this.isloggedIn$ = res);
  }


  removeProduct(value:any) {
    this.productService.removeLocalCartProduct(value)
  }

  calculateProductSinglePrice(product:any, value: any) {
    let price = 0
    price = product*value
    return price;
 }

 getQuantityValue(product) {
  if(product.quantity) {
     return product.quantity
  } else {
     return 1;
  }

}
getTotalPrice() {
  let total = 0;

  if(this.productService.cartCount> 0 ) {
    for(let product of this.productService.localStorageCartProducts) {
        total += (product.price*product.quantity);
     }
     return total;
  }

  return total;
}

  submitOrder() {
    if(!this.isloggedIn$) {
      this.router.navigateByUrl('/auth/login');
      this.authNoticeService.setNotice('Please login to submit order', 'success');
    }

    const json = JSON.parse(localStorage.getItem("cart_item"))

    let order = {};
    for (let i = 0; i < json.length; i++) {
      order[json[i].id] = json[i].quantity;
    }



    this.productService.postOrder(this.user$.id, order).pipe(
      tap(user=> {
        if(!user) {console.log('nema user')}
        else {
          console.log(user);
        }
      })
    ).subscribe()
  }


}
