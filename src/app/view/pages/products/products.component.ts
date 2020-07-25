import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProductService } from 'src/app/core/e-commerce';
import { ProductModel } from 'src/app/core/e-commerce/_models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input() products : any ;
  @Output() addToCart: EventEmitter<any> = new EventEmitter();


  products$ : any;
  constructor(
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {

    this.productService.getAllProducts().subscribe(res => {
      this.products$ = res.products
    });

  }

  public addToCartProduct(value:any) {
    this.productService.addToCart(value);
 }

}
