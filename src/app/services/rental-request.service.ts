import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalRequestService {
  private apiUrl = 'http://localhost:8080/rental-requests';

  constructor(private http: HttpClient) {}

  createRequest(propertyId: number, rentalRequest: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.apiUrl}/create/${propertyId}`, rentalRequest, { observe: 'response', responseType: 'text' });
  }
}
