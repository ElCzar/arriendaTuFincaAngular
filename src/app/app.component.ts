import { Component } from '@angular/core';

import { RouterModule, RouterOutlet } from '@angular/router';

import { FooterComponent } from "./footer/footer.component";

import { HeaderComponent } from "./header/header.component";

import { HearderAuthComponent } from "./hearder-auth/hearder-auth.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, HearderAuthComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'arriendaTuFincaAngular';
}
