import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { Routes, RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

const routes : Routes = [
  {
    path:'',
    component: CartComponent
  }
]


@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatCardModule,
    MatButtonModule

  ],
})
export class CartModule { }
