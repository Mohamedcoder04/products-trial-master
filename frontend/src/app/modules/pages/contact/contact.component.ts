import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatRipple} from "@angular/material/core";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../../core/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    MatRipple,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _toastrService: ToastrService,
    private _authService: AuthService,
    private _router: Router,
  ) {
    this.contactForm = this._fb.group({
      email: new FormControl('', [Validators.required, this.customEmailValidator()]),
      message: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    })
  }

  ngOnInit(): void {
    this._authService.isLogged.subscribe((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        this._router.navigate(['sign-in'])
      }
    })
  }


  onFormSubmit() {
    if (this.contactForm.valid) {
      this._toastrService.success('Demande de contact envoyée avec succès');
      this.contactForm.reset();
    }else{
      this.contactForm.markAllAsTouched();
    }
  }

  customEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const valid = emailRegex.test(control.value);
      return valid ? null : {invalidEmail: true};
    };
  }

}
