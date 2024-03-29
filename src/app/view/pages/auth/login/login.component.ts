import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/_service/auth.service';
import { AppState } from 'src/app/core/reducers';
import { Store } from '@ngrx/store';
import { Login } from 'src/app/core/auth/_actions/auth.actions';
import { tap, catchError, takeUntil, finalize } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { AuthNoticeService } from 'src/app/core/auth/auth-notice/auth-notice.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {


  loginForm : FormGroup;

  errors : any = [];

  error : string;
  loading: boolean;


  returnUrl : string;


  private unsubscribe: Subject<any>;


  constructor(
    private fb : FormBuilder,
    private auth: AuthService,
    private store: Store<AppState>,
    private authNoticeService: AuthNoticeService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.unsubscribe = new Subject();
   }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('page');

    this.initLoginForm();
    console.log(this.returnUrl)
  }

  ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
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
        // Validators.pattern('[a-zA-Z]*')
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
            this.store.dispatch(new Login({authToken: user.access_token}));
            if(this.returnUrl) {
              this.router.navigateByUrl(`/cart`);
            } else {
              this.router.navigateByUrl('/about')
            }
        } else {
          catchError(err => of([this.authNoticeService.setNotice(err.message, 'danger')]))
        }
      }),
      takeUntil(this.unsubscribe),
      finalize(() => {
        this.loading = false;
        this.cdr.markForCheck();
      }),
      // returns message from server
      catchError(err => of([this.authNoticeService.setNotice(err.statusText, 'danger')]))

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
