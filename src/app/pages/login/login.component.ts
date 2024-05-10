import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
      const controlErrors: ValidationErrors = this.registerForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          // @ts-ignore
          this.errorMessages[key] = this.getErrorMessage(key, keyError);
        });
      }
    });
  }

  login() {

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
