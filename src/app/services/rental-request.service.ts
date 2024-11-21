import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitud } from '../models/solicitud.model';

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
    return this.http.post<void>(`${this.apiUrl}/${solicitudId}/aceptar`, {});
  }

  cancelarSolicitud(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/cancelar`, {});
  }
}
