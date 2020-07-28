import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-header-cart',
  templateUrl: './header-cart.component.html',
  styleUrls: ['./header-cart.component.scss']
})
export class HeaderCartComponent implements OnInit, OnChanges {

 @Input() count : any ;
 @Input() cartProducts : any;
 @Input() currency: string;

 hiddenBadge = true

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if(this.count && this.count != 0) {
       this.hiddenBadge = false;
    } else {
       this.hiddenBadge = true;
    }
 }


  public caluculatePrice(product) {
    let total = null;
    total = product.price*product.quantity;
    return total;
  }

}
