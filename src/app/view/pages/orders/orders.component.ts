import { Component, OnInit, Input } from '@angular/core';
import { AppState } from 'src/app/core/reducers';
import { Store, select } from '@ngrx/store';
import { ProductService } from 'src/app/core/e-commerce';
import { Router } from '@angular/router';
import { currentUser } from 'src/app/core/auth/_selectors/auth.selectors';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/auth/_models/user.model';
import { map, tap, switchMap } from 'rxjs/operators';
import { ServerResponse, OrderModel } from 'src/app/core/e-commerce/_models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  // user$ : Observable<User>;

	user$: Observable<User>;
  orders : OrderModel[] = []
  count: number;
  id$ : string;


  @Input() currency : string;
  @Input() date : string


  constructor(
    public productService: ProductService,
    public router: Router,
    public store : Store<AppState>,
  ) {
  }

  ngOnInit(): void {


    this.store.pipe(select(currentUser)).subscribe((res: User) => {
      this.id$ = res.id

      this.fetchOrders(this.id$)

      console.log(this.id$)
    })
  }

  fetchOrders(id) {
    this.productService.getOrders(id).subscribe((data : ServerResponse) => {
      this.orders = data.orders
      this.count = data.count
    })
  }

}
