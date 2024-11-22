import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { DatePipe, CurrencyPipe } from '@angular/common'; // Asegúrate de importar estos pipes

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(CommonModule),
    importProvidersFrom(RouterModule),
    provideRouter(routes),
    provideHttpClient(),
    DatePipe, // Proveedor para formatear fechas
    CurrencyPipe // Proveedor para formatear valores monetarios
  ]
};
