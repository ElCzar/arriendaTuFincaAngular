import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud } from '../models/solicitud.model';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class RentalRequestService {
  private apiUrl = 'http://localhost:8080/rental-requests';

  constructor(private http: HttpClient) {}

  createRequest(propertyId: number, rentalRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create/${propertyId}`, rentalRequest, { observe: 'response', responseType: 'text' });
  }

  getSolicitudesByProperty(propertyId: number): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}/property/${propertyId}`);
  }

  aceptarSolicitud(solicitudId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/approve/${solicitudId}`, {});
  }

  cancelarSolicitud(solicitudId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/reject/${solicitudId}`, {});
  }

  getSolicitudesByUser(email: string): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${this.apiUrl}/renter?email=${encodeURIComponent(email)}`);
  }

  payRequest(requestId: number, paymentDetails: { complete: boolean, paid: boolean, amount: number, banco: string, numeroCuenta: string }): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/pay/${requestId}`, paymentDetails);
  }

  getPropertyById(propertyId: string): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/property/${propertyId}`);
  }
}



