import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Solicitud } from '../models/solicitud.model';
import { Property } from '../models/property.model';
import { Comment } from '../models/comment.model';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RentalRequestService {
  private apiUrl = 'http://localhost:8080/rental-requests';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  createRequest(propertyId: number, rentalRequest: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/create/${propertyId}`, rentalRequest, { headers, observe: 'response', responseType: 'text' });
  }

  getSolicitudesByProperty(propertyId: number): Observable<Solicitud[]> {
    const headers = this.getHeaders();
    return this.http.get<Solicitud[]>(`${this.apiUrl}/property/${propertyId}`, { headers });
  }

  aceptarSolicitud(solicitudId: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.put<void>(`${this.apiUrl}/approve/${solicitudId}`, {}, { headers });
  }

  cancelarSolicitud(solicitudId: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.put<void>(`${this.apiUrl}/reject/${solicitudId}`, {}, { headers });
  }

  getSolicitudesByUser(email: string): Observable<Solicitud[]> {
    const headers = this.getHeaders();
    return this.http.get<Solicitud[]>(`${this.apiUrl}/renter?email=${encodeURIComponent(email)}`, { headers });
  }

  payRequest(requestId: number, paymentDetails: { complete: boolean, paid: boolean, amount: number, banco: string, numeroCuenta: string }): Observable<string> {
    const headers = this.getHeaders();
    return this.http.put<string>(`${this.apiUrl}/pay/${requestId}`, paymentDetails, { headers });
  }

  getPropertyById(propertyId: string): Observable<Property> {
    const headers = this.getHeaders();
    return this.http.get<Property>(`${this.apiUrl}/property/${propertyId}`, { headers });
  }

  reviewProperty(requestId: number, comment: Comment): Observable<void> {
    const headers = this.getHeaders();
    return this.http.post<void>(`${this.apiUrl}/review-property/${requestId}`, comment, { headers });
  }

  getPropertyComments(propertyId: number): Observable<Comment[]> {
    const headers = this.getHeaders();
    return this.http.get<Comment[]>(`${this.apiUrl}/property-comments/${propertyId}`, { headers });
  }
}



