import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private apiUrl = 'http://localhost:3000/properties'; // Cambia por tu URL de API

  constructor(private http: HttpClient) {}

  // Obtener una propiedad por su ID
  getPropertyById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Actualizar una propiedad
  updateProperty(property: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${property.id}`, property);
  }
}
