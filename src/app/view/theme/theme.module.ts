import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { BaseComponent } from './base/base.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { PartialsModule } from '../partials/partials.module';
import {MatDividerModule} from '@angular/material/divider';
import { MatListModule } from '@angular/material/list'


@NgModule({
  declarations: [
    HeaderComponent,
    AsideComponent,
    BaseComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    PartialsModule,
    MatDividerModule,
    MatListModule
  ],
  exports: [
    HeaderComponent,
    AsideComponent,
    BaseComponent
  ]
})
export class ThemeModule { }
