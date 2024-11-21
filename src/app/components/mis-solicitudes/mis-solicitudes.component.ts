import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RentalRequestService } from '../../services/rental-request.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Solicitud } from '../../models/solicitud.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mis-solicitudes',
  templateUrl: './mis-solicitudes.component.html',
  styleUrls: ['./mis-solicitudes.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class MisSolicitudesComponent implements OnInit {
  solicitudes: Solicitud[] = [];
  userEmail: string = '';

  constructor(
    private rentalRequestService: RentalRequestService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserEmail();
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
    this.rentalRequestService.getSolicitudesByUser(this.userEmail).subscribe((data: Solicitud[]) => {
      this.solicitudes = data;
    });
  }

  getEstado(solicitud: Solicitud): string {
    if (solicitud.rejected) {
      return 'Rechazado';
    } else if (solicitud.approved) {
      return 'Aceptado';
    } else {
      return 'Pendiente';
    }
  }

  pagarSolicitud(solicitud: Solicitud): void {
    this.router.navigate(['/pay', { solicitudId: solicitud.id, propertyId: solicitud.propertyId }]);
  }

  mostrarBotonPagar(solicitud: Solicitud): boolean {
    return solicitud.approved && !solicitud.paid;
  }
}
