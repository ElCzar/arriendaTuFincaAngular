import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'http://localhost:8080/property'; 

  constructor(private http: HttpClient) {}

  createProperty(propertyData: FormData) {
    return this.http.post(`${this.apiUrl}`, propertyData).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener una propiedad por su ID
  getPropertyById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Actualizar una propiedad por su ID
  updateProperty(id: string, updatedPropertyData: any) {
    return this.http.put(`${this.apiUrl}/${id}`, updatedPropertyData);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}