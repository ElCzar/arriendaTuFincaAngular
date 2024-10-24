import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'http://localhost:8080/property'; 

  constructor(private http: HttpClient) {}

  createProperty(property: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, property);
  }
}
