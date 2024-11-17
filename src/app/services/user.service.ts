import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/user'; // Cambia a la URL de tu API

  constructor(private http: HttpClient) {}

  // Registrar un nuevo usuario
  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, user);
  }

  // Obtener el perfil del usuario
  getUserProfile(userId: number): Observable<any> {
    if (!userId || isNaN(userId)) {
      throw new Error('Invalid user ID');
    }
    return this.http.get(`${this.apiUrl}/info/${userId}`);
  }

  // Actualizar el perfil del usuario
  updateUserProfile(userId: number, userProfile: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${userId}`, userProfile);
  }
}