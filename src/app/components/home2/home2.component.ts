import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Property {
  id: string;
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
  selector: 'app-home2',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component implements OnInit {
  properties: Property[] = [];
  selectedPropertyId: string | undefined;

  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.propertyService.getAllProperties().subscribe(
      (data: Property[]) => {
        this.properties = data;
      },
      (error) => {
        console.error('Error fetching properties', error);
      }
    );
  }

  onPropertySelect(): void {
    if (this.selectedPropertyId) {
      this.router.navigate(['/ver-propiedad', this.selectedPropertyId]);
    }
  }
}
