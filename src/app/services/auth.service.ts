import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/user'; // Cambia a la URL de tu API
  private userIdSubject = new BehaviorSubject<number>(-1); // Variable global para almacenar el ID del usuario
  private authStatus = new BehaviorSubject<boolean>(false); // Variable para almacenar el estado de autenticación

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response) {
          this.userIdSubject.next(response); // Almacena el ID del usuario
          localStorage.setItem('userId', response.toString()); // También almacena en localStorage
          this.authStatus.next(true); // Actualiza el estado de autenticación
        }
      })
    );
  }

  getUserId(): Observable<number> {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userIdSubject.next(+userId);
      this.authStatus.next(true); // Actualiza el estado de autenticación
    }
    return this.userIdSubject.asObservable();
  }

  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  logout(): void {
    localStorage.removeItem('userId');
    this.userIdSubject.next(-1);
    this.authStatus.next(false); // Actualiza el estado de autenticación
  }


}