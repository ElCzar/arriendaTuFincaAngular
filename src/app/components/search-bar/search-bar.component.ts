import { Component } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchQuery: string = '';
  searchResults: any[] = [];
  showResults: boolean = false;

  constructor(private propertyService: PropertyService) {}

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.propertyService.searchPropertiesByName(this.searchQuery).subscribe(
        (results) => {
          this.searchResults = results;
          this.showResults = true;
          console.log('Resultados de búsqueda:', this.searchResults);
        },
        (error) => {
          console.error('Error al buscar propiedades:', error);
        }
      );
    } else {
      this.showResults = false;
    }
  }

  onSelectResult(result: any): void {
    this.searchQuery = result.name;
    this.showResults = false;
    // Aquí puedes redirigir al usuario a la página de detalles de la propiedad si es necesario
  }
}
