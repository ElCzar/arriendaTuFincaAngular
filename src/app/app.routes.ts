import { Routes } from '@angular/router';
import { PropertyFormComponent } from './components/property-form/property-form.component';
import { EditPropertyComponent } from './components/edit-property/edit-property.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

export const routes: Routes = [
  { path: 'crear-propiedad', component: PropertyFormComponent },
  { path: 'editar-propiedad/:id', component: EditPropertyComponent },
  { path: 'ver-usuario/:id', component: UserDetailsComponent },
  { path: '', redirectTo: '/crear-propiedad', pathMatch: 'full' }, // Ruta por defecto
  { path: '**', redirectTo: '/crear-propiedad' } // Ruta para manejar páginas no encontradas
];
