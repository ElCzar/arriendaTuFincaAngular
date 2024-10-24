import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PropertyService } from '../../services/property.service';
import { Router } from '@angular/router';
import { ErrorInterceptor } from '../../error.interceptor'; // Asegúrate de ajustar la ruta según tu estructura de proyecto

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
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
    hasGril: false,
    photo: null,
    ownerEmail: ''
  };

  constructor(private propertyService: PropertyService, private router: Router) {}

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
        this.router.navigate(['/']); // Redirige a la página de inicio después de crear la propiedad
      },
      (error) => {
        console.error('Error al crear la propiedad', error);
        // Manejar el error aquí
      }
    );
  }
}
