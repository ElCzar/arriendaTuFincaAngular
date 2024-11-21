import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { CommentsComponent } from "../comments/comments.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Property {
  id: number;
  name: string;
  description: string;
  municipality: string;
  department: string;
  typeOfEntrance: string;
  address: string;
  link: string;
  isAvailable: boolean;
  pricePerNight: number;
  amountOfRooms: number;
  amountOfBathrooms: number;
  amountOfResidents: number;
  isPetFriendly: boolean;
  hasPool: boolean;
  hasGril: boolean;
  ownerEmail: string;
  imageIds: string;
  rating: number;
}

@Component({
  selector: 'app-property-description',
  templateUrl: './property-description.component.html',
  styleUrls: ['./property-description.component.css'],
  standalone: true,
  imports: [ CommentsComponent, FormsModule, CommonModule],
})
export class PropertyDescriptionComponent implements OnInit {
  property: Property | undefined;
  requestId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    const propertyId = this.route.snapshot.paramMap.get('id');
    this.requestId = +this.route.snapshot.paramMap.get('requestId')!;
    if (propertyId) {
      this.propertyService.getPropertyById(propertyId.toString()).subscribe(
        (data: Property) => {
          this.property = data;
        },
        (error) => {
          console.error('Error fetching property details', error);
        }
      );
    }
  }

  makeReservation(): void {
    if (this.property) {
      this.router.navigate(['/request']);
    }
  }
}