import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../services/property.service'; // Asegúrate de que el servicio esté creado

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
    isAvailable: false,
    pricePerNight: 0,
    amountOfRooms: 0,
    amountOfBathrooms: 0,
    amountOfResidents: 0,
    isPetFriendly: false,
    hasPool: false,
    hasGrill: false,
    photo: null
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

  // Carga la información de la propiedad desde el backend
  loadPropertyData(): void {
    this.propertyService.getPropertyById(this.propertyId).subscribe(
      (response) => {
        this.propertyData = response;  // Prellenamos los campos con los datos de la propiedad
      },
      (error) => {
        console.error('Error al cargar la propiedad', error);
      }
    );
  }

  updateProperty(field: string, event: Event): void {
    const target = event.target as HTMLInputElement;
  
    if (target.type === 'checkbox') {
      this.propertyData[field] = target.checked;
    } else {
      this.propertyData[field] = target.value;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.propertyData.photo = input.files[0]; // Assuming single file upload
    }
  }

  // Este método envía la propiedad actualizada al backend
  onSubmit(event: Event): void {
    event.preventDefault();
    this.propertyService.updateProperty(this.propertyId, this.propertyData).subscribe(
      (response) => {
        console.log('Propiedad actualizada con éxito', response);
        this.router.navigate(['/arrendador/mis-propiedades']);
      },
      (error) => {
        console.error('Error al actualizar la propiedad', error);
      }
    );
  }
}

