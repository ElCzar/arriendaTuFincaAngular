import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component'; // Importa el componente de registro
import { Home2Component } from './home2/home2.component';
import { PayComponent } from './pay/pay.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';


export const routes: Routes = [
  { path: '',  component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent }, // Ruta para el registro
  { path: 'home2', component: Home2Component },
  { path: 'pay', component: PayComponent },
  { path: 'solicitudes', component: SolicitudesComponent }
];
