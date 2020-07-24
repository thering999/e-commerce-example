import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderCartComponent } from './header-cart/header-cart.component';
import {MatButtonModule} from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    HeaderCartComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule
  ],
  exports: [
    HeaderCartComponent
  ]
})
export class PartialsModule { }
