import { Component } from '@angular/core';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent {
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

  constructor(private propertyService: PropertyService) {}

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
      this.propertyData.photo = input.files[0]; // Para la imagen
    }
  }

  onSubmit(event: Event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
  
    // Llamamos al servicio para crear la propiedad usando HttpClient
    this.propertyService.createProperty(this.propertyData).subscribe(
      (response) => {
        console.log('Propiedad creada exitosamente', response);
        // Lógica adicional, como redirigir o limpiar el formulario
      },
      (error) => {
        console.error('Error al crear la propiedad', error);
        // Manejar el error aquí
      }
    );
  }
}
