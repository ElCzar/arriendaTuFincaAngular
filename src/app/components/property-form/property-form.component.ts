import { Component } from '@angular/core';
import { PropertyService } from '../../services/property.service';  // Ajusta la ruta al servicio

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent {
  propertyData = {
    name: '',
    description: '',
    municipality: '',
    department: '',
    typeOfEntrance: '',
    address: '',
    link: '',
    isAvailable: true,
    pricePerNight: 0,
    amountOfRooms: 0,
    amountOfBathrooms: 0,
    amountOfResidents: 0,
    isPetFriendly: false,
    hasPool: false,
    hasGril: false,
    photo: null
  };

  constructor(private propertyService: PropertyService) { }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.propertyData.photo = file;
  }

  onSubmit() {
    const formData = new FormData();
  
    // Añadir cada propiedad manualmente
    formData.append('name', this.propertyData.name);
    formData.append('description', this.propertyData.description);
    formData.append('municipality', this.propertyData.municipality);
    formData.append('department', this.propertyData.department);
    formData.append('typeOfEntrance', this.propertyData.typeOfEntrance);
    formData.append('address', this.propertyData.address);
    formData.append('link', this.propertyData.link);
    formData.append('isAvailable', this.propertyData.isAvailable.toString());
    formData.append('pricePerNight', this.propertyData.pricePerNight.toString());
    formData.append('amountOfRooms', this.propertyData.amountOfRooms.toString());
    formData.append('amountOfBathrooms', this.propertyData.amountOfBathrooms.toString());
    formData.append('amountOfResidents', this.propertyData.amountOfResidents.toString());
    formData.append('isPetFriendly', this.propertyData.isPetFriendly.toString());
    formData.append('hasPool', this.propertyData.hasPool.toString());
    formData.append('hasGril', this.propertyData.hasGril.toString());
  
    if (this.propertyData.photo) {
      formData.append('photo', this.propertyData.photo);
    }
  
    this.propertyService.createProperty(formData).subscribe(
      (response: any) => {
        console.log('Property created successfully', response);
      },
      (error: any) => {
        console.error('Error creating property', error);
      }
    );
  }
  
}  
