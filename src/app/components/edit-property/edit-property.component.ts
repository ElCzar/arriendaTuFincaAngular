import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {
  propertyData: any = {
    name: '',
    description: '',
    municipality: '',
    department: '',
    typeOfEntrance: '',
    address: '',
    link: '',
    pricePerNight: 0,
    amountOfRooms: 0,
    amountOfBathrooms: 0,
    amountOfResidents: 0,
    isPetFriendly: false,
    hasPool: false,
    hasGrill: false,
    photo: null,
    ownerEmail: ''
  };

  propertyId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id')!;
    this.loadPropertyData();
  }

  loadPropertyData(): void {
    this.propertyService.getPropertyById(this.propertyId).subscribe(
      data => {
        this.propertyData = data;
      },
      error => {
        console.error('Error loading property data:', error);
      }
    );
  }

  updateProperty(field: string, event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.type === 'checkbox') {
      this.propertyData[field] = target.checked;
    } else {
      this.propertyData[field] = target.value;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.propertyData.photo = input.files[0];
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.propertyService.updateProperty(this.propertyId, this.propertyData)
      .subscribe(
        response => {
          console.log('Propiedad actualizada:', response);
          this.router.navigate(['/home2']);
        },
        error => {
          console.error('Error actualizando la propiedad:', error);
        }
      );
  }
}
