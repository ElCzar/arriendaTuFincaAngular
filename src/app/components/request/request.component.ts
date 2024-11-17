import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HearderAuthComponent } from '../hearder-auth/hearder-auth.component';
import { FooterComponent } from '../footer/footer.component';
import { RentalRequestService } from '../../services/rental-request.service';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HearderAuthComponent, FooterComponent],
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {
  requestForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private rentalRequestService: RentalRequestService,
    private router: Router
  ) {
    this.requestForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fechaInicio: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      numeroResidentes: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      const rentalRequest = {
        requesterEmail: this.requestForm.value.email,
        arrivalDate: this.requestForm.value.fechaInicio,
        departureDate: this.requestForm.value.fechaFinal,
        amountOfResidents: this.requestForm.value.numeroResidentes
      };

      const propertyId = 1; // Reemplaza esto con el ID de la propiedad correspondiente

      this.rentalRequestService.createRequest(propertyId, rentalRequest).subscribe(
        (response) => {
          alert(response.body || 'Solicitud de arriendo enviada con éxito');
          this.router.navigate(['/home2']);
        },
        (error) => {
          console.error('Error al enviar la solicitud de arriendo', error);
          alert('Error al enviar la solicitud de arriendo');
        }
      );
    }
  }
}