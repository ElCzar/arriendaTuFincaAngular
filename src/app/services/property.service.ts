import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private apiUrl = 'http://localhost:8080/property';  // URL de tu backend

  constructor(private http: HttpClient) {}

  // Método para crear una propiedad usando HttpClient
  createProperty(property: any): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.post(this.apiUrl, property, { headers });
  }

  getPropertyById(id: string): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  updateProperty(id: string, propertyData: any): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.put(`${this.apiUrl}/${id}`, propertyData, { headers });
  }

  searchPropertiesByName(name: string): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.get(`${this.apiUrl}/name`, { headers, params: { name } });
  }

  getAllProperties(): Observable<any[]> {
    const headers = this.createAuthHeaders();
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}
