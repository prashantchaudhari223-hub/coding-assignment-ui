import { Routes } from '@angular/router';
import { MedicineListComponent } from './components/medicine-list/medicine-list.component';

export const routes: Routes = [
  { path: '', component: MedicineListComponent },
  { path: '**', redirectTo: '' }
];
