import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {

  @Input() product : any ;

  @Output() addToCart: EventEmitter<any> = new EventEmitter();



  constructor() { }

  ngOnInit(): void {
  }

  public addToCartProduct(product:any) {
    this.addToCart.emit(product);
 }

}
