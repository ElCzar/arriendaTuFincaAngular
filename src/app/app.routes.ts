import { Routes } from '@angular/router';
import { PropertyFormComponent } from './components/property-form/property-form.component';
import { EditPropertyComponent } from './components/edit-property/edit-property.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { Home2Component } from './home2/home2.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'home2', component: Home2Component },
  { path: 'crear-propiedad', component: PropertyFormComponent },
  { path: 'editar-propiedad/:id', component: EditPropertyComponent },
  { path: 'ver-usuario/:id', component: UserDetailsComponent },
];
