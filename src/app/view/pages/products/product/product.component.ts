import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/e-commerce';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product$ : any;
  productId : string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      (params: ParamMap) => {
      this.productId = params.get('productId')
      }
    );

    this.productService.getProductById(this.productId).subscribe(res => {
      this.product$ = res
    });

  }
}
