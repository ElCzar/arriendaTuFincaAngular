import { Component } from '@angular/core';
import { RatingComponent } from '../rating/rating.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [RatingComponent, FormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  comments = [
    {
      name: 'Usuario1',
      photo: 'assets/user1.jpg',
      stars: 4,
      comment: 'Este es un comentario.'
    },
    {
      name: 'Usuario2',
      photo: 'assets/user2.jpg',
      stars: 5,
      comment: 'Este es otro comentario.'
    }
  ];
  newComment = '';

  addComment(): void {
    if (this.newComment.trim()) {
      this.comments.push({
        name: 'Usuario3',
        photo: 'assets/user3.jpg',
        stars: 3,
        comment: this.newComment
      });
      this.newComment = '';
    }
  }
}
