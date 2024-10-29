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
    return this.http.post(this.apiUrl, property);
  }

  getPropertyById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateProperty(id: string, propertyData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, propertyData);
  }

  searchPropertiesByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/name`, { params: { name } });
  }

  getAllProperties(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  
}
