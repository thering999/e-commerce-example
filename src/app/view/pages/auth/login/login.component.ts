import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/_service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm : FormGroup;

  errors : any = [];

  error : string;


  constructor(
    private fb : FormBuilder,
    private auth: AuthService
  ) { }

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
        Validators.pattern('[A-Z ]*')
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

    const authData = {
			email: controls.email.value,
			password: controls.password.value
    };

  }

  controlError(controlName: string, validationType: string): boolean {
    const controls = this.loginForm.controls[controlName];
    if(!controls)
      return false;

      const result = controls.hasError(validationType) && (controls.dirty || controls.touched)
      return result;

  }
}
