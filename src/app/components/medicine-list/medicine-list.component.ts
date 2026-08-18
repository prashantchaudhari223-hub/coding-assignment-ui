import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MedicineListItem } from '../../models/medicine.model';
import { MedicineService } from '../../services/medicine.service';
import { MedicineAddComponent } from '../medicine-add/medicine-add.component';

@Component({
  selector: 'app-medicine-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MedicineAddComponent],
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {
  medicines: MedicineListItem[] = [];
  isLoading = false;
  loadError: string | null = null;

  /** [Good to have] search box, bound with a debounce so it doesn't hit the API on every keystroke. */
  searchControl = new FormControl('', { nonNullable: true });

  constructor(private medicineService: MedicineService) {}

  ngOnInit(): void {
    this.loadMedicines();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => {
          this.isLoading = true;
          return this.medicineService.getAll(term);
        })
      )
      .subscribe({
        next: (data) => {
          this.medicines = data;
          this.isLoading = false;
          this.loadError = null;
        },
        error: () => {
          this.isLoading = false;
          this.loadError = 'Could not load medicines. Is the API running on http://localhost:5117?';
        }
      });
  }

  loadMedicines(): void {
    this.isLoading = true;
    this.medicineService.getAll(this.searchControl.value).subscribe({
      next: (data) => {
        this.medicines = data;
        this.isLoading = false;
        this.loadError = null;
      },
      error: () => {
        this.isLoading = false;
        this.loadError = 'Could not load medicines. Is the API running on http://localhost:5117?';
      }
    });
  }

  /** Grid row CSS class per the spec: red for expiring soon, yellow for low stock. */
  rowClass(medicine: MedicineListItem): string {
    if (medicine.isExpiringSoon) return 'row-expiring';
    if (medicine.isLowStock) return 'row-low-stock';
    return '';
  }
}
