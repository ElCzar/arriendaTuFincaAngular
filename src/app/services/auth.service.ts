import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth'; // Cambia a la URL de tu API
  private userIdSubject = new BehaviorSubject<number>(-1); // Variable global para almacenar el ID del usuario

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.userId) {
          this.userIdSubject.next(response.userId); // Almacena el ID del usuario
        }
      })
    );
  }

  // Método para cerrar sesión
  logout(): void {
    this.userIdSubject.next(-1); // Resetea el ID del usuario
  }

  // Método para obtener el ID del usuario
  getUserId(): Observable<number> {
    return this.userIdSubject.asObservable();
  }
}