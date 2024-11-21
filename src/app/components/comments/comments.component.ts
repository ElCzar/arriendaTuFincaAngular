import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RentalRequestService } from '../../services/rental-request.service';
import { Comment } from '../../models/comment.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

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
  comment: Comment = { content: '', rating: 0, authorEmail: '' };
  comments: Comment[] = [];
  userEmail: string = '';

  constructor(
    private rentalRequestService: RentalRequestService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUserEmail();
    this.loadComments();
  }

  getUserEmail() {
    this.authService.getUserId().subscribe((userId) => {
      if (userId !== -1) {
        this.userService.getUserInfo(userId).subscribe((user) => {
          this.userEmail = user.email;
          this.comment.authorEmail = this.userEmail; // Assign userEmail to authorEmail
        });
      }
    });
  }

  loadComments(): void {
    this.rentalRequestService.getPropertyComments(this.propertyId).subscribe(
      (comments: Comment[]) => {
        this.comments = comments.map(comment => ({
          ...comment,
          authorEmail: comment.authorEmail || 'Anónimo' // Ensure authorEmail is handled correctly
        }));
      },
      (error) => {
        console.error('Error loading comments', error);
      }
    );
  }

  submitComment(): void {
    if (!this.userEmail) {
      console.warn('Warning: userEmail is empty!');
      return;
    }

    const commentToSend: Comment = {
      content: this.comment.content,
      rating: this.comment.rating,
      authorEmail: this.userEmail
    };

    console.log('Submitting comment:', commentToSend);

    this.rentalRequestService.reviewProperty(this.requestId, commentToSend).subscribe({
      next: () => {
        console.log('Comment saved successfully');
        this.comments.push({ ...commentToSend });
        this.comment = { content: '', rating: 0, authorEmail: this.userEmail };
      },
      error: (error) => {
        console.error('Submission error:', error);
        alert('Error submitting comment');
      }
    });
  }
}