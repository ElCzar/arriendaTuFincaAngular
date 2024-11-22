import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RentalRequestService } from '../../services/rental-request.service';
import { AuthService } from '../../services/auth.service';
import { Comment } from '../../models/comment.model';
import { Solicitud } from '../../models/solicitud.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class CommentsComponent implements OnInit {
  @Input() propertyId!: number;
  comments: Comment[] = [];
  requestId!: number;
  userEmail!: string;

  constructor(
    private rentalRequestService: RentalRequestService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUserId().subscribe(userId => {
      if (userId !== -1) {
        this.userEmail = this.authService.getUserEmail(); // Asume que tienes un método para obtener el email del usuario
        this.loadRequestId(this.propertyId);
        this.loadComments();
      } else {
        console.error('User not authenticated');
      }
    });
  }

  loadComments(): void {
    this.rentalRequestService.getPropertyComments(this.propertyId).subscribe(
      (comments: Comment[]) => {
        this.comments = comments;
      },
      (error) => {
        console.error('Error loading comments', error);
      }
    );
  }

  loadRequestId(propertyId: number): void {
    this.rentalRequestService.getSolicitudesByProperty(propertyId).subscribe(
      (solicitudes: Solicitud[]) => {
        console.log('Solicitudes:', solicitudes); // Debugging
        const solicitud = solicitudes.find(s => s.propertyId === propertyId && s.requesterEmail === this.userEmail);
        if (solicitud) {
          this.requestId = solicitud.id;
          console.log('Request ID found:', this.requestId); // Debugging
        } else {
          console.error('Solicitud de arriendo no encontrada');
        }
      },
      (error) => {
        console.error('Error fetching solicitudes', error);
      }
    );
  }

  addComment(commentText: string, rating: number): void {
    if (this.requestId) {
      const comment: Comment = { content: commentText, rating, authorEmail: this.userEmail };
      this.rentalRequestService.reviewProperty(this.requestId, comment).subscribe(
        () => {
          this.loadComments();
        },
        (error) => {
          console.error('Error adding comment', error);
        }
      );
    } else {
      console.error('Request ID is missing');
    }
  }
}