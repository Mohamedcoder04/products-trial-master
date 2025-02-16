import {Component} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatProgressSpinner,
    NgIf,
    PaginatorModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  signUpForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _toastrService: ToastrService,
    private _router: Router,
  ) {
    this.signUpForm = this._fb.group({
      firstname: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, this.customEmailValidator()]),
      password: new FormControl('', Validators.required),
    })
  }


  signUp() {
    if (this.signUpForm.valid) {
      this._authService.signUp(this.signUpForm.value).subscribe({
        next: () => {
          this._toastrService.success('account added successfully.');
          this._router.navigate(['sign-in']);
        },
        error: (err) => {
          this.signUpForm.reset();
          if (err.error.validationErrors) {
            err.error.validationErrors.forEach((err: any) => {
              this._toastrService.error(err);
            })
          }
          console.log(err);
        }
      })
    }
  }

  signIn() {
    this._router.navigate(['sign-in']);
  }

  customEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const valid = emailRegex.test(control.value);
      return valid ? null : {invalidEmail: true};
    };
  }
}
