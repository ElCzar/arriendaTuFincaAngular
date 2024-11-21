import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Login } from '../models/login.model';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/user'; // Cambia a la URL de tu API
  private userIdSubject = new BehaviorSubject<number>(-1); // Variable global para almacenar el ID del usuario
  private authStatus = new BehaviorSubject<boolean>(false); // Variable para almacenar el estado de autenticación
  private userEmail: string = ''; // Variable para almacenar el email del usuario

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(credentials: Login): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: Token) => {
        if (response) {
          this.userIdSubject.next(response.id); // Almacena el ID del usuario
          localStorage.setItem('userId', response.id.toString()); // También almacena en localStorage
          localStorage.setItem('token', response.token); // Almacena el token en localStorage
          this.userEmail = credentials.email; // Almacena el email del usuario
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

  getUserEmail(): string {
    return this.userEmail;
  }

  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    this.userIdSubject.next(-1);
    this.authStatus.next(false); // Actualiza el estado de autenticación
  }
}