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

@Component({
  selector: 'app-property-description',
  templateUrl: './property-description.component.html',
  styleUrls: ['./property-description.component.css'],
  standalone: true,
  imports: [CommonModule, CommentsComponent]
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
          this.loadRequestId(propertyId);
        },
        (error) => {
          console.error('Error fetching property details', error);
        }
      );
    }
  }

  loadRequestId(propertyId: string): void {
    this.rentalRequestService.getSolicitudesByProperty(+propertyId).subscribe(
      (solicitudes: Solicitud[]) => {
        const solicitud = solicitudes.find(s => s.propertyId === +propertyId && s.requesterEmail === this.userEmail);
        if (solicitud) {
          this.requestId = solicitud.id;
        }
      },
      (error) => {
        console.error('Error fetching solicitudes', error);
      }
    );
  }

  makeReservation(): void {
    if (this.property) {
      this.router.navigate(['/request', { propertyId: this.property.id }]);
    }
  }
}