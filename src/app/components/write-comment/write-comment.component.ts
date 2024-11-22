import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RentalRequestService } from '../../services/rental-request.service';
import { Comment } from '../../models/comment.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-write-comment',
  templateUrl: './write-comment.component.html',
  styleUrls: ['./write-comment.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class WriteCommentComponent implements OnInit {
  @Input() requestId!: number;
  @Input() propertyId!: number;
  @Input() userEmail!: string;
  commentForm!: FormGroup;
  comments: Comment[] = [];
  canComment: boolean = false;

  constructor(
    private fb: FormBuilder,
    private rentalRequestService: RentalRequestService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadComments();
    this.checkCommentPermission();
  }

  private initializeForm(): void {
    this.commentForm = this.fb.group({
      content: ['', Validators.required],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  private checkCommentPermission(): void {
    if (!this.requestId) {
      console.warn('No request ID available - user must make a reservation first');
      this.canComment = false;
    } else {
      this.canComment = true;
    }
  }

  getUserEmail() {
    this.authService.getUserId().subscribe((userId) => {
      if (userId !== -1) {
        this.userService.getUserInfo(userId).subscribe((user) => {
          this.userEmail = user.email;
          this.commentForm.patchValue({ authorEmail: this.userEmail });
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
    if (!this.canComment) {
      alert('You must make a reservation first to comment');
      return;
    }

    if (!this.userEmail || !this.requestId) {
      console.warn('Missing required data:', { userEmail: this.userEmail, requestId: this.requestId });
      return;
    }

    const commentToSend: Comment = {
      content: this.commentForm.value.content,
      rating: this.commentForm.value.rating,
      authorEmail: this.userEmail
    };

    this.rentalRequestService.reviewProperty(this.requestId, commentToSend).subscribe({
      next: () => {
        console.log('Comment saved successfully');
        this.comments.push({ ...commentToSend });
        this.commentForm.reset();
      },
      error: (error) => {
        console.error('Submission error:', error);
        alert('Error submitting comment. Please make sure you have an active reservation.');
      }
    });
  }
}
