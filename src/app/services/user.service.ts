import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/user'; // Cambia a la URL de tu API

  constructor(private http: HttpClient) {}

  // Registrar un nuevo usuario
  registerUser(user: any): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.post(`${this.apiUrl}/create`, user, { headers });
  }

  // Obtener información del usuario
  getUserInfo(userId: number): Observable<User> {
    const headers = this.createAuthHeaders();
    return this.http.get<User>(`${this.apiUrl}/info/${userId}`, { headers });
  }

  // Obtener el perfil del usuario
  getUserProfile(userId: number): Observable<any> {
    if (!userId || isNaN(userId)) {
      throw new Error('Invalid user ID');
    }
    const headers = this.createAuthHeaders();
    return this.http.get(`${this.apiUrl}/info/${userId}`, { headers });
  }

  // Actualizar el perfil del usuario
  updateUserProfile(userId: number, userProfile: any): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.put(`${this.apiUrl}/update/${userId}`, userProfile, { headers });
  }

  // Subir foto de perfil
  uploadProfilePicture(userId: number, file: File, formData: FormData): Observable<any> {
    formData.append('file', file);
    const headers = this.createAuthHeaders();
    return this.http.post(`${this.apiUrl}/uploadPhoto/${userId}`, formData, { headers });
  }

  // Cambiar contraseña
  changePassword(userId: number, changePasswordDTO: any): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.put(`${this.apiUrl}/update/${userId}/password`, changePasswordDTO, { headers });
  }

  // Eliminar usuario
  deleteUser(userId: number, loginDTO: any): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.request('delete', `${this.apiUrl}/delete/${userId}`, { body: loginDTO, headers });
  }

  // Crear encabezados de autenticación
  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}