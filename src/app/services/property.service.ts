import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private apiUrl = 'http://localhost:8080/property';  // URL de tu backend

  constructor(private http: HttpClient) {}

  // Método para crear una propiedad usando HttpClient
  createProperty(property: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, property);
  }

  // Obtener una propiedad por su ID
  getPropertyById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Actualizar una propiedad
  updateProperty(property: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${property.id}`, property);
  }
}
