import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;


  errorMessages = {
    email: '',
    username: '',
    password: '',
    repassword: '',
    name: '',
    phone: ''
  };

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private userService: UserService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repassword: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
    }, {validator: this.passwordMatchValidator.bind(this)});
    // @ts-ignore
    merge(this.registerForm.statusChanges, this.registerForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  passwordMatchValidator(g: FormGroup) {
    const password = g.get('password')?.value;
    const repassword = g.get('repassword')?.value;
    return password === repassword ? null : { mismatch: true };
  }

  private updateErrorMessage() {
    Object.keys(this.registerForm.controls).forEach(key => {
      // @ts-ignore
      const controlErrors: ValidationErrors = this.registerForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          // @ts-ignore
          this.errorMessages[key] = this.getErrorMessage(key, keyError);
          console.log(this.registerForm.getError('mismatch'));
        });
      }
    });
  }

  private getErrorMessage(controlName: string, errorName: string) {
    switch (controlName) {
      case 'email':
        return errorName === 'required' ? 'Email is required' : 'Email is invalid';
      case 'username':
        return errorName === 'required' ? 'Username is required' : 'Username must be between 3 and 20 characters';
      case 'password':
        return errorName === 'required' ? 'Password is required' : 'Password must be at least 6 characters';
      case 'repassword':
        return errorName === 'required' ? 'Password confirmation is required' : 'Password confirmation must be at least 6 characters';
      case 'name':
        return errorName === 'required' ? 'Name is required' : 'Name must be at least 3 characters';
      case 'phone':
        return errorName === 'required' ? 'Phone number is required' : 'Phone number must be at least 10 characters';
      default:
        return '';
    }
  }

  async register() {
    await this.authService.register(this.registerForm.value?.email, this.registerForm.value?.password).then(cred => {
      console.log(cred);

      const user: User = {
        id: cred.user?.uid as string,
        email: this.registerForm.value.email,
        username: this.registerForm.value.username,
        name: this.registerForm.value.name,
        phone: this.registerForm.value.phone,
        package: null,
        bonuses: []
      };

      this.userService.create(user).then(_ => {
        console.log('User created');
      }).catch(err => {
        console.error(err);
      });

      this.router.navigateByUrl('/account');
    }).catch(err => {
      console.error(err);
    });
  }
}
