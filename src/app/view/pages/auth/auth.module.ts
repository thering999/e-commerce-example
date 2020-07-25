import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/core/auth/_service/auth.service';
import { StoreModule } from '@ngrx/store';
import { authReducer } from 'src/app/core/auth/_reducers/auth.reducers';
import { AuthEffects } from 'src/app/core/auth/_effects/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { AuthNoticeComponent } from './auth-notice/auth-notice.component';
import { MatIconModule } from '@angular/material/icon';


const routes : Routes =
[
  {
    path:'login',
    component: LoginComponent
  }
]


@NgModule({
  declarations: [LoginComponent, AuthNoticeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    StoreModule.forFeature('auth', authReducer),
		EffectsModule.forFeature([AuthEffects])

  ]
})

export class AuthModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AuthModule,
			providers: [
				AuthService
			]
		};
	}
}
