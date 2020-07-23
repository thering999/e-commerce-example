import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [ContactComponent, HomeComponent],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
