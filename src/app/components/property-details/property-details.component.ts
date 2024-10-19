import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importa CommonModule

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
  standalone: true,
  imports: [CommonModule]  // Agrega CommonModule aquí
})
export class PropertyDetailsComponent {
  propertyName = 'Casa de Ensueño en el Campo';
  location = 'Antioquia, Colombia';
  imageMainUrl = 'https://example.com/imagen-principal.jpg';
  propertyImages = [
    'https://example.com/imagen1.jpg',
    'https://example.com/imagen2.jpg',
    'https://example.com/imagen3.jpg'
  ];
  description = 'Esta hermosa propiedad es el lugar perfecto para desconectarse del estrés de la ciudad y disfrutar de la naturaleza.';
  pricePerNight = 150000; // Precio en moneda local
  bedrooms = 3;
  bathrooms = 2;
  capacity = 6;
}
