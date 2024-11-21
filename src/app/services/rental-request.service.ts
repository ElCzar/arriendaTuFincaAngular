import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Solicitud } from '../models/solicitud.model';
import { Property } from '../models/property.model';
import { Comment } from '../models/comment.model';
import { tap, catchError } from 'rxjs/operators';

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

  reviewProperty(requestId: number, comment: Comment): Observable<void> {
    // Ensure payload matches CommentDTO structure exactly
    const payload = {
      content: comment.content,
      rating: comment.rating,
      authorEmail: comment.authorEmail
    };

    // Debug logging
    console.log('Request URL:', `${this.apiUrl}/review-property/${requestId}`);
    console.log('Payload:', payload);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<void>(
      `${this.apiUrl}/review-property/${requestId}`, 
      payload,
      { headers }
    ).pipe(
      tap(response => console.log('Response:', response)),
      catchError(error => {
        console.error('Error details:', error);
        return throwError(() => error);
      })
    );
  }

  getPropertyComments(propertyId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/property-comments/${propertyId}`);
  }
  
}



