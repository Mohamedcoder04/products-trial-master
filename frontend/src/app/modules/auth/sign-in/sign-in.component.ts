import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AuthService} from "../../../core/auth/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgIf,
    MatIconButton,
    MatIcon,
    MatProgressSpinner,
    MatButton,
    MatLabel,
    MatError
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _toastrService: ToastrService,
    private _router: Router,
  ) {
    this.signInForm = this._fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
  }


  signIn() {
    if(this.signInForm.valid){
      this._authService.signIn(this.signInForm.value).subscribe({
        next: () => {
          this._router.navigate(['home']);
        },
        error: (err) => {
          this._toastrService.error(err.error.message);
        }
      })
    }
  }

  signUp() {
    this._router.navigate(['sign-up']);
  }
}
