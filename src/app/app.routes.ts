import { Routes } from '@angular/router';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { EditPropertyComponent } from './components/edit-property/edit-property.component';
import { PropertyFormComponent } from './components/property-form/property-form.component';

export const routes: Routes = [
 
  {path: 'propiedad/editar/:id', component: EditPropertyComponent},
  {path: 'propiedad/crear', component: PropertyFormComponent},
  { path: 'propiedad/detalles/:id', component: PropertyDetailsComponent },
  { path: '', redirectTo: '/user/:id', pathMatch: 'full' }
];
