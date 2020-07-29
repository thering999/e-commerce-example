import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './view/theme/base/base.component';


const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children:
    [
      {
        path: '',
        loadChildren: () => import('./view/pages/home/home.module').then(m=>m.HomeModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./view/pages/about/about.module').then(m=>m.AboutModule)
      },
      {
        path: 'contact',
        loadChildren: () => import ('./view/pages/contact/contact.module').then(m=>m.ContactModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./view/pages/products/products.module').then(m=>m.ProductsModule)
      },
      {
        path: 'auth',
        loadChildren: () => import('./view/pages/auth/auth.module').then(m=>m.AuthModule)
      },
      {
        path: 'cart',
        loadChildren: ()=> import('./view/pages/cart/cart.module').then(m=>m.CartModule)
      },
      {
        path: 'orders',
        loadChildren: ()=> import('./view/pages/orders/orders.module').then(m=>m.OrdersModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
