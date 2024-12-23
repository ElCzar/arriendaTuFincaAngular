import { Routes } from '@angular/router';
import { PropertyFormComponent } from './components/property-form/property-form.component';
import { EditPropertyComponent } from './components/edit-property/edit-property.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { Home2Component } from './components/home2/home2.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { PayComponent } from './components/pay/pay.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { PropertyDescriptionComponent } from './components/property-description/property-description.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { RequestComponent } from './components/request/request.component';
import { MyPropertiesComponent } from './components/myproperties/myproperties.component';
import { MisSolicitudesComponent } from './components/mis-solicitudes/mis-solicitudes.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'home2', component: Home2Component },
  { path: 'crear-propiedad/:id', component: PropertyFormComponent },
  { path: 'editar-propiedad/:id', component: EditPropertyComponent },
  { path: 'ver-usuario/:id', component: UserDetailsComponent },
  { path: 'editar-usuario/:id', component: EditUserComponent },
  { path: 'solicitudes/:propertyId', component: SolicitudesComponent },
  { path: 'pay', component: PayComponent },
  { path: 'ver-propiedad/:id', component: PropertyDescriptionComponent },
  { path: 'request', component: RequestComponent },
  {path: 'mis-propiedades', component: MyPropertiesComponent},
  {path: 'mis-solicitudes/:id', component: MisSolicitudesComponent},
  {path: 'cambiar-contrasena', component: ChangePasswordComponent}

  
];
