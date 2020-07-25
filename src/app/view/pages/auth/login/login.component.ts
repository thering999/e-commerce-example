import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/_service/auth.service';
import { AppState } from 'src/app/core/reducers';
import { Store } from '@ngrx/store';
import { Login } from 'src/app/core/auth/_actions/auth.actions';
import { tap, catchError, takeUntil, finalize } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { AuthNoticeService } from 'src/app/core/auth/auth-notice/auth-notice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm : FormGroup;

  errors : any = [];

  error : string;
  loading: boolean;

  private unsubscribe: Subject<any>;


  constructor(
    private fb : FormBuilder,
    private auth: AuthService,
    private store: Store<AppState>,
    private authNoticeService: AuthNoticeService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.unsubscribe = new Subject();
   }

  ngOnInit(): void {

    this.initLoginForm();
  }

  initLoginForm() {

    this.loginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(320)

        ])
      ],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        // Validators.pattern('[A-Z ]*')
        ])
      ]
    });
  }


  submit() {
    const controls = this.loginForm.controls;

    if(this.loginForm.invalid) {
      Object.keys(controls).forEach(controlName => controls[controlName].markAllAsTouched());
      return;
    }

    this.loading = true;

    const authData = {
			email: controls.email.value,
			password: controls.password.value
    };

    this.auth.login(authData.email, authData.password).pipe(
      tap(user => {
        if(user) {
          // try {
            this.store.dispatch(new Login({authToken: user.token, user: user.user}))
            let userId = user.user.id
            console.log('here')
            // this.router.navigateByUrl(`/profile/index/${userId}`);
        } else {
          catchError(err => of([this.authNoticeService.setNotice(err.response.message, 'danger')]))
        }
      }),
      takeUntil(this.unsubscribe),
      finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }),
      // returns message from server
      catchError(err => of([this.authNoticeService.setNotice(err.response.message, 'danger')]))
    )
    .subscribe(
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  controlError(controlName: string, validationType: string): boolean {
    const controls = this.loginForm.controls[controlName];
    if(!controls)
      return false;

      const result = controls.hasError(validationType) && (controls.dirty || controls.touched)
      return result;

  }
}
