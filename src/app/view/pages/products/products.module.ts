import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from 'src/app/core/e-commerce';
import { ProductComponent } from './product/product.component';
import { PartialsModule } from '../../partials/partials.module';


const routes : Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: ':productId',
    component: ProductComponent
  }
]

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    PartialsModule
  ],
  providers: [
    ProductService
  ]
})
export class ProductsModule { }
