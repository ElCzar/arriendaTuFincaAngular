import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.model';
import { CommentsComponent } from '../comments/comments.component';
import { CommonModule } from '@angular/common';
import { RentalRequestService } from '../../services/rental-request.service';
import { Solicitud } from '../../models/solicitud.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { WriteCommentComponent } from '../write-comment/write-comment.component';

@Component({
  selector: 'app-property-description',
  templateUrl: './property-description.component.html',
  styleUrls: ['./property-description.component.css'],
  standalone: true,
  imports: [CommonModule, WriteCommentComponent, CommentsComponent]
})
export class PropertyDescriptionComponent implements OnInit {
  property: Property | undefined;
  requestId: number | undefined;
  userEmail: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private rentalRequestService: RentalRequestService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUserEmail();
  }

  getUserEmail() {
    this.authService.getUserId().subscribe((userId) => {
      if (userId !== -1) {
        this.userService.getUserInfo(userId).subscribe((user) => {
          this.userEmail = user.email;
          console.log('User email:', this.userEmail); // Debugging
          this.loadPropertyAndRequestId();
        });
      }
    });
  }

  loadPropertyAndRequestId(): void {
    const propertyId = this.route.snapshot.paramMap.get('id');
    if (propertyId) {
      this.propertyService.getPropertyById(propertyId.toString()).subscribe(
        (data: Property) => {
          this.property = data;
          console.log('Property loaded:', this.property); // Debugging
          this.loadRequestId(propertyId);
        },
        (error) => {
          console.error('Error fetching property details', error);
        }
      );
    }
  }

  loadRequestId(propertyId: string): void {
    if (!this.userEmail) {
      console.error('User email not found');
      return;
    }

    this.rentalRequestService.getSolicitudesByProperty(+propertyId).subscribe({
      next: (solicitudes: Solicitud[]) => {
        console.log('Solicitudes:', solicitudes);
        const solicitud = solicitudes.find(s => 
          s.propertyId === +propertyId && 
          s.requesterEmail === this.userEmail
        );
        
        if (solicitud) {
          this.requestId = solicitud.id;
          console.log('Request ID found:', this.requestId);
        } else {
          console.log('No rental request found for this property and user');
          this.requestId = undefined;
        }
      },
      error: (error) => {
        console.error('Error fetching solicitudes:', error);
        this.requestId = undefined;
      }
    });
  }

  makeReservation(): void {
    if (this.property) {
      this.router.navigate(['/request', { propertyId: this.property.id }]);
    }
  }
}