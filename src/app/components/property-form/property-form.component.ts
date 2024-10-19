import { Component } from '@angular/core';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent {
  property: any = {
    propertyName: '',
    pricePerNight: 0,
    bedrooms: 0,
    bathrooms: 0,
    capacity: 0,
    propertyType: '',
    location: '',
    availability: '',
    description: '',
    images: []
  };

  // Método para manejar cambios en los campos del formulario
  handleInputChange(event: Event, field: string): void {
    const inputElement = event.target as HTMLInputElement;
    this.property[field] = inputElement.value;
  }

  // Método para manejar la selección de archivos
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.property.images = Array.from(inputElement.files);
    }
  }

  // Método para enviar el formulario
  onSubmit(event: Event): void {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    console.log('Propiedad creada:', this.property);
    // Aquí puedes manejar el envío de los datos a una API o backend
  }
}
