import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MedicineService } from '../../services/medicine.service';

@Component({
  selector: 'app-medicine-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './medicine-add.component.html',
  styleUrls: ['./medicine-add.component.css']
})
export class MedicineAddComponent {
  /** Emits after a medicine is successfully saved, so the parent can refresh the grid. */
  @Output() medicineAdded = new EventEmitter<void>();

  isSubmitting = false;
  errorMessage: string | null = null;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private medicineService: MedicineService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(200)]],
      brand: ['', [Validators.required, Validators.maxLength(200)]],
      expiryDate: ['', [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      notes: ['', [Validators.maxLength(1000)]]
    });
  }

  get f() {
    return this.form.controls;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    const value = this.form.getRawValue();
    this.medicineService
      .create({
        fullName: value.fullName!,
        brand: value.brand!,
        expiryDate: value.expiryDate!,
        quantity: Number(value.quantity),
        price: Number(value.price),
        notes: value.notes || undefined
      })
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.errorMessage = null;
          this.form.reset({ quantity: 0, price: 0 });
          this.toastr.success('Medicine saved successfully!', 'Success');
          this.medicineAdded.emit();
        },
        error: () => {
          this.isSubmitting = false;
          this.errorMessage = 'Could not save the medicine. Please check the form and try again.';
          this.toastr.error('Failed to save medicine', 'Error');
        }
      });
  }
}
