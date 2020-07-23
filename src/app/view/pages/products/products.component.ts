import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/e-commerce';
import { ProductModel } from 'src/app/core/e-commerce/_models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  // products : Observable<ProductModel[]>;
  products : any;
  constructor(
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {

  this.productService.getAllProducts().subscribe(res => {
    this.products = res.products
  });

  }

}
