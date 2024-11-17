import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentsService } from '../../services/comments.service';

interface CommentDTO {
  user: string;
  text: string;
}

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: CommentDTO[] = [];
  newComment = '';
  requestId = 1; // Cambia esto según sea necesario
  currentUser = 'CurrentUser'; // Obtén el nombre del usuario que hizo login
  email = 'user@example.com'; // Cambia esto según sea necesario
  propertyId = 1; // Cambia esto según sea necesario

  constructor(private commentsService: CommentsService) {}

  ngOnInit() {
    this.loadPropertyComments(); // Cambia esto según el tipo de comentarios que deseas cargar
  }

  loadRenterComments() {
    this.commentsService.getRenterComments(this.email).subscribe(comments => {
      this.comments = comments;
    });
  }

  loadHostComments() {
    this.commentsService.getHostComments(this.email).subscribe(comments => {
      this.comments = comments;
    });
  }

  loadPropertyComments() {
    this.commentsService.getPropertyComments(this.propertyId).subscribe(comments => {
      this.comments = comments;
    });
  }

  addComment() {
    if (this.newComment.trim()) {
      const comment: CommentDTO = { user: this.currentUser, text: this.newComment.trim() };
      this.commentsService.addPropertyReview(this.requestId, comment).subscribe(
        () => {
          this.comments.push(comment);
          this.newComment = '';
        },
        (error) => {
          console.error('Error al agregar el comentario', error);
        }
      );
    } else {
      console.error('El comentario no puede estar vacío.');
    }
  }
}
