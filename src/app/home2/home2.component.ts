import { Component } from '@angular/core';
import { HearderAuthComponent } from "../hearder-auth/hearder-auth.component";
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home2',
  standalone: true,
  imports: [FooterComponent, HearderAuthComponent],
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css'] // Corregido: styleUrls en lugar de styleUrl
})
export class Home2Component {

}
