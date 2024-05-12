import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });

    merge(this.loginForm.statusChanges, this.loginForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  errorMessages = {
    email: '',
    password: ''
  };

  private updateErrorMessage() {
    Object.keys(this.loginForm.controls).forEach(key => {
      // @ts-ignore
      const controlErrors: ValidationErrors = this.loginForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          // @ts-ignore
          this.errorMessages[key] = this.getErrorMessage(key, keyError);
        });
      }
    });
  }

  async login() {
    await this.authService.login(this.loginForm.value?.email, this.loginForm.value?.password).then(cred => {
      this.router.navigateByUrl('/account');
    }).catch(err => {
      console.error(err);
    });
  }

  private getErrorMessage(controlName: string, errorName: string) {
    switch (controlName) {
      case 'email':
        return errorName === 'required' ? 'Email is required' : 'Email is invalid';
      case 'password':
        return errorName === 'required' ? 'Password is required' : 'Password must be at least 6 characters';
      default:
        return '';
    }
  }
}
