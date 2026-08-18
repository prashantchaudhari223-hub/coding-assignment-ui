import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CreateMedicine, MedicineListItem } from '../models/medicine.model';

@Injectable({ providedIn: 'root' })
export class MedicineService {
  private readonly baseUrl = `${environment.apiBaseUrl}/medicines`;
  private readonly pageSize = 20;

  constructor(private http: HttpClient) {}

  getAll(search?: string, page: number = 1): Observable<MedicineListItem[]> {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('pageSize', this.pageSize.toString());
    
    if (search && search.trim().length > 0) {
      params = params.set('search', search.trim());
    }
    
    return this.http.get<any>(this.baseUrl, { params }).pipe(
      map((response) => {
        // API response structure: { statusCode: 200, data: { items: [...], total: n, page: p, pageSize: ps } }
        if (response?.data?.items && Array.isArray(response.data.items)) {
          return response.data.items;
        }
        // Fallback for direct array response
        if (Array.isArray(response)) {
          return response;
        }
        // Fallback for other structures
        return response.items || response.$values || response.value || [];
      })
    );
  }

  create(medicine: CreateMedicine): Observable<MedicineListItem> {
    return this.http.post<any>(this.baseUrl, medicine).pipe(
      map((response) => {
        // API returns: { statusCode: 201, data: { ...medicine } }
        return response?.data || response;
      })
    );
  }
}
