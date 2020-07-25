import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderCartComponent } from './header-cart/header-cart.component';
import {MatButtonModule} from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { ProductService } from 'src/app/core/e-commerce';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HeaderCartComponent,
    AddToCartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule
  ],
  exports: [
    HeaderCartComponent,
    AddToCartComponent,
  ],
  providers: [
    // ProductService
  ]
})
export class PartialsModule { }
