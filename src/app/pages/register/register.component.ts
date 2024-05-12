import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";
import {SnackBarComponent} from "../../shared/snack-bar/snack-bar.component";

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

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private userService: UserService,
              private _snackbar: SnackBarComponent) {
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
  const repasswordControl = g.get('repassword');
  const repassword = repasswordControl?.value;

  if (password !== repassword) {
    repasswordControl?.setErrors({ ...repasswordControl?.errors, mismatch: true });
    return { mismatch: true };
  } else {
    if (repasswordControl?.hasError('mismatch')) {
      // @ts-ignore
      delete repasswordControl?.errors['mismatch'];
      // @ts-ignore
      if (!Object.keys(repasswordControl?.errors).length) repasswordControl?.setErrors(null);
    }
  }
  return null;
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
        return errorName === 'required' ? 'Email cím kötelező' : 'Hibás email cím formátum';
      case 'username':
        return errorName === 'required' ? 'Felhasználónév kötelező' : 'A felhasználónévnek 3 és 20 karakter között kell lennie';
      case 'password':
        return errorName === 'required' ? 'Jelszó kötelező' : 'A jelszónak legalább 6 karakter hosszúnak kell lennie';
      case 'repassword':
        if (errorName === 'required') {
          return 'Megerősítési jelszó kötelező';
        } else if (errorName === 'mismatch') {
          return 'Megerősítési jelszó nem egyezik meg a jelszóval';
        } else {
          return 'A megerősítő jelszónak legalább 6 karakter hosszúnak kell lennie';
        }
      case 'name':
        return errorName === 'required' ? 'Név kötelező' : 'A névnek legalább 3 karakter hosszúnak kell lennie';
      case 'phone':
        return errorName === 'required' ? 'Telefonszám kötelező' : 'A telefonnak legalább 10 karakter hosszúnak kell lennie';
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
        package: "",
        bonuses: []
      };

      this.userService.create(user).then(_ => {
        this._snackbar.openSnackBar('Sikeres regisztráció!', 'Rendben');
      }).catch(err => {
        console.error(err);
      });

      this.router.navigateByUrl('/account');
    }).catch(err => {
      console.error(err);
    });
  }
}
