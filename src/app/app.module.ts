import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThemeModule } from './view/theme/theme.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './core/e-commerce';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './core/reducers';
import { AuthService } from './core/auth/_service/auth.service';
import { AuthEffects } from './core/auth/_effects/auth.effects';
import { AuthModule } from './view/pages/auth/auth.module';
import { PartialsModule } from './view/partials/partials.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule.forRoot(),
    StoreModule.forRoot(reducers, {metaReducers}),
		EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
    ThemeModule,
    PartialsModule
  ],
  providers: [
    ProductService,
    AuthService,
    AuthEffects
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
