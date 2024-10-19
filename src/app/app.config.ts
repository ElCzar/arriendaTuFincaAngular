import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common'; // Importa CommonModule para las directivas como *ngFor y *ngIf

export const appConfig = {
  providers: [
    provideRouter(routes), // Configuración de las rutas
    provideHttpClient(), // Proveedor para peticiones HTTP
    CommonModule // Para usar las directivas comunes de Angular como *ngIf y *ngFor
  ]
};
