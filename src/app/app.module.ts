import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { PropertyFormComponent } from './components/property-form/property-form.component'; // Importar componentes
import { EditPropertyComponent } from './components/edit-property/edit-property.component'; // Importar componentes
import { UserDetailsComponent } from './components/user-details/user-details.component'; // Importar componentes
import { routes } from './app.routes';  // Asegúrate de que la ruta sea correcta.

@NgModule({
  declarations: [
    // PropertyFormComponent, // Componente de formulario de propiedad
    EditPropertyComponent, // Componente para editar propiedad
    UserDetailsComponent, // Componente de detalles de usuario
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    PropertyFormComponent, // Aquí importas el componente standalone
    AppComponent, // Aquí importas el componente standalone
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Agrega esto si el problema persiste
  // bootstrap: [AppComponent], // El componente que se cargará al inicio de la aplicación.
})
export class AppModule {}
