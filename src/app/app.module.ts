import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PropertyFormComponent } from './components/property-form/property-form.component';
import { EditPropertyComponent } from './components/edit-property/edit-property.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { routes } from './app.routes';
import { HearderAuthComponent } from './components/hearder-auth/hearder-auth.component';

@NgModule({
  declarations: [
    //AppComponent,
    EditPropertyComponent,
    
  ],
  imports: [
    AppComponent,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    PropertyFormComponent,
    SearchBarComponent,
    SolicitudesComponent,
    UserDetailsComponent,
    HearderAuthComponent,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  //bootstrap: [AppComponent],
})
export class AppModule {}
