import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component'; // Importa el componente de registro
import { Home2Component } from './home2/home2.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent }, // Ruta para el registro
  { path: 'home2', component: Home2Component }
];
