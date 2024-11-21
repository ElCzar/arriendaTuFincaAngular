import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { CommentsService } from '../../services/comments.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommentDTO } from '../../models/comment.dto';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() propertyId!: number;
  @Input() requestId!: number;
  comments: CommentDTO[] = [];
  newComment = '';
  newRating: number | null = null;
  user!: string;
  email!: string;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private commentsService: CommentsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener información del usuario autenticado
    this.authService.getUserId().subscribe({
      next: (userId) => {
        if (userId !== -1) {
          this.userService.getUserProfile(userId).subscribe({
            next: (userProfile) => {
              this.user = userProfile.name;
              this.email = userProfile.email;
            },
            error: (err) => {
              console.error('Error al obtener el perfil del usuario:', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('Error al obtener el ID del usuario:', err);
      }
    });

    // Cargar comentarios de la propiedad
    if (this.propertyId) {
      this.commentsService.getPropertyComments(this.propertyId).subscribe({
        next: (comments) => {
          this.comments = comments;
        },
        error: (err) => {
          console.error('Error al cargar los comentarios:', err);
        }
      });
    } else {
      console.error('El propertyId no está definido.');
    }
  }

  // Agregar un nuevo comentario
  addComment(): void {
    if (!this.newComment.trim()) {
      this.errorMessage = 'El comentario no puede estar vacío.';
      return;
    }
    if (this.newRating === null || this.newRating < 1 || this.newRating > 5) {
      this.errorMessage = 'La calificación debe estar entre 1 y 5.';
      return;
    }

    // Crear el comentario con el formato esperado por el backend
    const comment: CommentDTO = {
      content: this.newComment,
      rating: this.newRating,
      authorEmail: this.email,
      user: this.user,
      requestId: this.requestId,
      propertyId: this.propertyId
    };

    this.commentsService.addPropertyReview(this.requestId, comment).subscribe({
      next: () => {
        this.comments.push({ ...comment, user: this.user }); // Agregar al listado
        this.newComment = '';
        this.newRating = null;
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = 'Error al agregar el comentario.';
        console.error('Error al agregar el comentario:', err);
      }
    });
  }
}
