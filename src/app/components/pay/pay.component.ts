import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalRequestService } from '../../services/rental-request.service';
import { PropertyService } from '../../services/property.service';
import { Solicitud } from '../../models/solicitud.model';
import { Property } from '../../models/property.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgFor]
})
export class PayComponent implements OnInit {
  pagoForm: FormGroup;
  bancos = ['Bancolombia', 'Av Villas', 'Banco Popular', 'Nu Bank'];
  requestId!: number;
  propertyId!: number;
  totalPrice!: number;

  constructor(
    private readonly fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private rentalRequestService: RentalRequestService,
    private propertyService: PropertyService,
    private cdr: ChangeDetectorRef
  ) {
    this.pagoForm = this.fb.group({
      valor: [{ value: 0, disabled: true }, Validators.required],
      banco: ['', Validators.required],
      numeroCuenta: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  ngOnInit(): void {
    this.requestId = +this.route.snapshot.paramMap.get('solicitudId')!;
    this.propertyId = +this.route.snapshot.paramMap.get('propertyId')!;
    this.loadSolicitud();
  }

  loadSolicitud(): void {
    this.rentalRequestService.getSolicitudesByProperty(this.propertyId).subscribe(
      (solicitudes: Solicitud[]) => {
        const solicitud = solicitudes.find(s => s.id === this.requestId);
        if (solicitud) {
          this.calculateTotalPrice(solicitud);
        } else {
          console.error('Solicitud no encontrada');
        }
      },
      (error) => {
        console.error('Error al cargar la solicitud', error);
      }
    );
  }

  calculateTotalPrice(solicitud: Solicitud): void {
    this.propertyService.getPropertyById(this.propertyId.toString()).subscribe(
      (property: Property) => {
        const startDate = new Date(solicitud.arrivalDate);
        const endDate = new Date(solicitud.departureDate);
        const numberOfDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
        this.totalPrice = property.pricePerNight * numberOfDays;
        this.pagoForm.patchValue({ valor: this.totalPrice });
        this.cdr.detectChanges(); // Forzar la detección de cambios
      },
      (error) => {
        console.error('Error al cargar la propiedad', error);
      }
    );
  }

  onSubmit() {
    if (this.pagoForm.valid) {
      const paymentDetails = {
        complete: true,
        paid: true,
        amount: this.totalPrice,
        banco: this.pagoForm.value.banco,
        numeroCuenta: this.pagoForm.value.numeroCuenta
      };
      console.log('Enviando detalles de pago:', paymentDetails); // Verifica el objeto antes de enviarlo
      this.rentalRequestService.payRequest(this.requestId, paymentDetails).subscribe(
        (response) => {
          alert('Pago exitoso, ten una linda estadía');
          this.router.navigate(['/mis-solicitudes']);
        },
        (error) => {
          if (error.status === 200) {
            // Si el estado es 200, considera la respuesta como exitosa
            alert('Pago exitoso, ten una linda estadía');
            this.router.navigate(['/mis-solicitudes']);
          } else {
            console.error('Error al realizar el pago', error);
            alert('Error al realizar el pago');
          }
        }
      );
    }
  }
}