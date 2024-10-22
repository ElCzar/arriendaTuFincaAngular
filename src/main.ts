import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // Asegúrate de que las rutas están bien definidas
import { CommonModule } from '@angular/common'; // Para usar *ngIf, *ngFor
import { DatePipe, CurrencyPipe } from '@angular/common'; // Para usar los pipes de formato

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Importamos las rutas
    provideHttpClient(), // Importamos el servicio HttpClient para hacer llamadas HTTP
    DatePipe, // Proveedor para formatear fechas
    CurrencyPipe, // Proveedor para formatear valores monetarios
    { provide: CommonModule, useValue: CommonModule } // Importamos el CommonModule
  ]
}).catch(err => console.error(err));
