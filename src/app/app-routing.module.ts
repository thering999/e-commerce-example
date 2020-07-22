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
        path: 'about',
        loadChildren: () => import('./view/pages/about/about.module').then(m=>m.AboutModule)
      },
      {
        path: 'contact',
        loadChildren: () => import ('./view/pages/contact/contact.module').then(m=>m.ContactModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
