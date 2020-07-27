import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/e-commerce';

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

  products$: any;

  constructor(
    public productService: ProductService
  ) { }

  ngOnInit(): void {

      this.products$ = this.productService.cartTotal();

  }


  removeProduct(value:any) {
    this.productService.removeLocalCartProduct(value)
  }

  calculateProductSinglePrice(product:any, value: any) {
    let price = 0;
    product.quantity = value;
    price = product.price*value;
    return price;
 }

 getQuantityValue(product) {
  if(product.quantity) {
     return product.quantity
  } else {
     return 1;
  }
}

}
