import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtenemos el id de la propiedad desde la URL
    this.propertyId = this.route.snapshot.paramMap.get('id')!;
    this.loadPropertyData();
  }

  // Carga la información de la propiedad
  loadPropertyData(): void {
    // Aquí llamaríamos al servicio que obtiene los datos desde el backend usando `propertyId`
    // Simularemos la carga de datos por ahora
    this.propertyData = {
      name: 'Casa en la playa',
      description: 'Hermosa casa con vista al mar',
      municipality: 'Cartagena',
      department: 'Bolívar',
      typeOfEntrance: 'Entrada privada',
      address: 'Calle 123, Playa',
      isAvailable: true,
      pricePerNight: 150,
      amountOfRooms: 3,
      amountOfBathrooms: 2,
      amountOfResidents: 6,
      isPetFriendly: true,
      hasPool: true,
      hasGrill: false,
      photo: null
    };
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
      this.propertyData.photo = input.files[0]; // Para la imagen
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    // Aquí llamarías al servicio que envía los datos actualizados al backend
    console.log('Propiedad actualizada:', this.propertyData);
    this.router.navigate(['/arrendador/mis-propiedades']); // Redirige a otra página después de la actualización
  }
}
