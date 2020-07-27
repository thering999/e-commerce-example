import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProductService } from 'src/app/core/e-commerce';
import { ProductModel } from 'src/app/core/e-commerce/_models/product.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @Input() products : any ;
  @Output() addToCart: EventEmitter<any> = new EventEmitter();


  products$: any [];

  skip : number;


  observ$: Observable<any>;

  constructor(
    private productService: ProductService,
  ) {
    this.skip = 0;
  }

  ngOnInit(): void {
    this.getProducts(this.skip)

  }

  getProducts(skip: number){
    this.productService.getAllProducts(skip).subscribe(
      data => {
        this.products$ = data.products
      }
    )
      this.observ$ = this.productService.getAllProducts(skip)

  }


  switchPagination(event) {
    this.getProducts(event.data);
  }



  addToCartProduct(value:any) {
    this.productService.addToCart(value);
 }

}
