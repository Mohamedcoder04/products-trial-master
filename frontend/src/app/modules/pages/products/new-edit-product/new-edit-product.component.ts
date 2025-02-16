import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {MatRipple} from "@angular/material/core";
import {NgIf} from "@angular/common";
import {ProductsService} from "../data-access/products.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-new-edit-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDialogClose,
    MatRipple,
    MatLabel,
    MatError,
    NgIf
  ],
  templateUrl: './new-edit-product.component.html',
  styleUrl: './new-edit-product.component.scss'
})
export class NewEditProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private _productService: ProductsService,
    private _toastrService: ToastrService,
    private _fb: FormBuilder,
    private _matDialog: MatDialogRef<NewEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.productForm = this._fb.group({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    if (this.data) {
      this.productForm.patchValue(this.data);
    }
  }


  onFormSubmit() {
    if (this.data) {
      this._productService.update(
        {
          ...this.data,
          name: this.productForm.value.name,
          description: this.productForm.value.description,
          price: this.productForm.value.price,
          category: this.productForm.value.category,
        }
      ).subscribe({
        next: (data) => {
          this._toastrService.success('product updated successfully.');
          this._matDialog.close(true);
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else {
      this._productService.create(
        this.productForm.value
      ).subscribe({
        next: (data) => {
          this._toastrService.success('product created successfully.');
          this._matDialog.close(true);
        },
        error: (err) => {
          if (err.status === 403) {
            this._matDialog.close(false);
            this._toastrService.error(err.error.message);
          }
          console.log(err);
        }
      })
    }
  }
}
