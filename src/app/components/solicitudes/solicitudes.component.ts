import { Component } from '@angular/core';

interface Solicitud {
  nombre: string;
  fechaHoraSolicitud: string;
  fechaLlegada: string;
  fechaSalida: string;
  valor: number;
  estado: string;
}

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent {
  estados = ['Por aceptar', 'Aceptada', 'Pagada', 'Por calificar', 'Rechazada', 'Finalizada'];
  solicitudes: Solicitud[] = [
    {
      nombre: 'Juan Pérez',
      fechaHoraSolicitud: '2023-10-01 10:00',
      fechaLlegada: '2023-10-10',
      fechaSalida: '2023-10-15',
      valor: 1000000,
      estado: 'Por aceptar'
    },
  ];

  aceptarSolicitud(solicitud: Solicitud) {
    solicitud.estado = 'Aceptada';
  }

  cancelarSolicitud(solicitud: Solicitud) {
    solicitud.estado = 'Rechazada';
  }

  calificarSolicitud(solicitud: Solicitud) {
    alert('Calificar solicitud de ' + solicitud.nombre);
    solicitud.estado = 'Finalizada';
  }

  mostrarBotonAceptarCancelar(solicitud: Solicitud): boolean {
    return solicitud.estado === 'Por aceptar';
  }

  mostrarBotonCalificar(solicitud: Solicitud): boolean {
    return solicitud.estado === 'Por calificar';
  }
}