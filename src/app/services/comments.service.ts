import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CommentDTO {
  user: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
private apiUrl = 'http://localhost:8080/rental-requests'; // Cambia esta URL por la de tu backend; // Cambia esta URL por la de tu backend

  constructor(private http: HttpClient) {}

  getComments(): Observable<CommentDTO[]> {
    return this.http.get<CommentDTO[]>(`${this.apiUrl}/comments`);
  }

  addPropertyReview(requestId: number, comment: CommentDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/review-property/${requestId}`, comment);
  }

  addHostReview(requestId: number, comment: CommentDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/review-host/${requestId}`, comment);
  }

  addRenterReview(requestId: number, comment: CommentDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/review-renter/${requestId}`, comment);
  }
}