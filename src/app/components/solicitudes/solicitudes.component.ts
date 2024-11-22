import { Component, OnInit, Input } from '@angular/core';
import { RentalRequestService } from '../../services/rental-request.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Solicitud } from '../../models/solicitud.model'; // Ajusta la ruta según tu estructura de carpetas
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class SolicitudesComponent implements OnInit {
  @Input() propertyId!: number;
  solicitudes: Solicitud[] = [];
  userEmail: string = '';

  constructor(
    private rentalRequestService: RentalRequestService,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.propertyId = +params['propertyId'];
      this.getUserEmail();
    });
  }

  getUserEmail() {
    this.authService.getUserId().subscribe((userId) => {
      if (userId !== -1) {
        this.userService.getUserInfo(userId).subscribe((user) => {
          this.userEmail = user.email;
          this.loadSolicitudes();
        });
      }
    });
  }

  loadSolicitudes() {
    this.rentalRequestService.getSolicitudesByProperty(this.propertyId).subscribe((data: Solicitud[]) => {
      this.solicitudes = data;
    });
  }

  aceptarSolicitud(solicitud: Solicitud) {
    this.rentalRequestService.aceptarSolicitud(solicitud.id).subscribe(() => {
      solicitud.approved = true;
      solicitud.rejected = false;
      solicitud.canceled = false;
      solicitud.completed = true; // Asegúrate de que el estado completed se actualice
    });
  }

  cancelarSolicitud(solicitud: Solicitud) {
    this.rentalRequestService.cancelarSolicitud(solicitud.id).subscribe(() => {
      solicitud.rejected = true;
      solicitud.approved = false;
      solicitud.canceled = true; // Asegúrate de que el estado canceled se actualice
      solicitud.completed = true; // Asegúrate de que el estado completed se actualice
    });
  }

  mostrarBotonAceptarCancelar(solicitud: Solicitud): boolean {
    return !solicitud.approved && !solicitud.rejected && !solicitud.canceled;
  }

  mostrarBotonCalificar(solicitud: Solicitud): boolean {
    return solicitud.approved && !solicitud.completed;
  }
}