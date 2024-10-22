import { Component } from '@angular/core';
import { HearderAuthComponent } from "../hearder-auth/hearder-auth.component";
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home2',
  standalone: true,
  imports: [HearderAuthComponent, FooterComponent],
  templateUrl: './home2.component.html',
  styleUrl: './home2.component.css'
})
export class Home2Component {

}
