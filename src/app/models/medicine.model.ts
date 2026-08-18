/** Grid row shape — mirrors MedicineListItemDto from the API (Notes excluded). */
export interface MedicineListItem {
  id: string;
  fullName: string;
  expiryDate: string;
  quantity: number;
  price: number;
  brand: string;
  isExpiringSoon: boolean;
  isLowStock: boolean;
}

/** Payload shape for creating a new medicine — mirrors CreateMedicineDto. */
export interface CreateMedicine {
  fullName: string;
  notes?: string;
  expiryDate: string;
  quantity: number;
  price: number;
  brand: string;
}
