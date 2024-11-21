import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentDTO } from '../models/comment.dto';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private apiUrl = 'http://localhost:8080/rental-requests'; // Cambia esta URL según la configuración de tu backend

  constructor(private http: HttpClient) {}

  // Obtener comentarios de arrendatarios
  getRenterComments(email: string): Observable<CommentDTO[]> {
    return this.http.post<CommentDTO[]>(`${this.apiUrl}/renter-comments`, { email });
  }

  // Obtener comentarios de anfitriones
  getHostComments(email: string): Observable<CommentDTO[]> {
    return this.http.post<CommentDTO[]>(`${this.apiUrl}/host-comments`, { email });
  }

  // Obtener comentarios de una propiedad específica
  getPropertyComments(propertyId: number): Observable<CommentDTO[]> {
    return this.http.get<CommentDTO[]>(`${this.apiUrl}/property-comments/${propertyId}`);
  }

  // Agregar una reseña al anfitrión
  addHostReview(requestId: number, comment: CommentDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/review-host/${requestId}`, {
      content: comment.content,
      rating: comment.rating,
      authorEmail: comment.authorEmail
    });
  }

  // Agregar una reseña al arrendatario
  addRenterReview(requestId: number, comment: CommentDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/review-renter/${requestId}`, {
      content: comment.content,
      rating: comment.rating,
      authorEmail: comment.authorEmail
    });
  }

  // Agregar una reseña a una propiedad
  addPropertyReview(requestId: number, comment: CommentDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/review-property/${requestId}`, {
      content: comment.content,
      rating: comment.rating,
      authorEmail: comment.authorEmail
    });
  }
}
