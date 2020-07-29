import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { Routes, RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ProductService } from 'src/app/core/e-commerce';
import { SuccesfullComponent } from './succesfull/succesfull.component';

const routes : Routes = [
  {
    path:'',
    component: CartComponent
  },
  {
    path:'successful',
    component: SuccesfullComponent
  }
]


@NgModule({
  declarations: [CartComponent, SuccesfullComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule


  ],
  providers: [
    // ProductService
  ]
})
export class CartModule { }
