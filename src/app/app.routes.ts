import { Routes } from '@angular/router';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { PropertyFormComponent } from './components/property-form/property-form.component';

export const routes: Routes = [
  { path: 'arrendador/crear-propiedad', component: PropertyFormComponent },
  { path: '', redirectTo: '/arrendador/crear-propiedad', pathMatch: 'full' }
];
