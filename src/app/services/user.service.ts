import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.post(`${this.apiUrl}/create`, user);
  }

  getUserInfo(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/info/${userId}`);
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

  uploadProfilePicture(userId: number, file: File, formData: FormData): Observable<any> {
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/uploadPhoto/${userId}`, formData);
  }

  changePassword(userId: number, changePasswordDTO: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${userId}/password`, changePasswordDTO);
  }


  deleteUser(userId: number, loginDTO: any): Observable<any> {
    return this.http.request('delete', `${this.apiUrl}/delete/${userId}`, { body: loginDTO });
  }
  
}