import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/core/e-commerce';
import { User } from 'src/app/core/auth/_models/user.model';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers';
import { currentUser } from 'src/app/core/auth/_selectors/auth.selectors';
import { Logout } from 'src/app/core/auth/_actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() currency: string;

  user$: Observable<User>;
  isLoggedIn$: Observable<boolean>;

  constructor(
    public productService: ProductService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.user$ = this.store.pipe(select(currentUser))
    console.log(this.user$)
  }


  logout() {
    this.store.dispatch(new Logout());
  }


  getTotalPrice() {
    let total = 0;
    if(this.productService.localStorageCartProducts && this.productService.localStorageCartProducts.length>0) {
       for(let product of this.productService.localStorageCartProducts) {
          total += (product.price*product.quantity);
       }
       return total;
    }

    return total;
  }
}
