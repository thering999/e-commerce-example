import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AuthGuard } from 'src/app/core/auth/_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    canActivate: [AuthGuard]
  }
]


@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule
  ],
  providers: [
    AuthGuard
  ]
})
export class OrdersModule { }
