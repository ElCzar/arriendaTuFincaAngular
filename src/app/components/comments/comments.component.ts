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

  constructor(private commentsService: CommentsService) {}

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    this.commentsService.getComments().subscribe(comments => {
      this.comments = comments;
    });
  }

  addComment() {
    if (this.newComment.trim()) {
      const comment: CommentDTO = { user: this.currentUser, text: this.newComment };
      this.commentsService.addPropertyReview(this.requestId, comment).subscribe(() => {
        this.comments.push(comment);
        this.newComment = '';
      });
    }
  }
}
