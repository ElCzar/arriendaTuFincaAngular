import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component"; // Importa RouterModule

@Component({
  selector: 'app-root',
  standalone: true, // Marca el componente como standalone
  imports: [RouterModule, HeaderComponent, FooterComponent], // Asegúrate de importar RouterModule aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'arriendaTuFincaAngular';
}
