import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar *ngIf

@Component({
  selector: 'app-hearder-auth',
  standalone: true,
  imports: [CommonModule], // Añade CommonModule a los imports
  templateUrl: './hearder-auth.component.html',
  styleUrls: ['./hearder-auth.component.css']
})
export class HearderAuthComponent {
  menuVisible = false;
  userName = 'Nombre del Usuario'; // Puedes obtener esto de un servicio de usuario

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  viewUser() {
    // Navega a la página de ver usuario
    this.router.navigate(['/ver-usuario', 'user-id']); // Reemplaza 'user-id' con el ID real del usuario
  }

  editUser() {
    // Navega a la página de editar usuario
    this.router.navigate(['/editar-usuario', 'user-id']); // Reemplaza 'user-id' con el ID real del usuario
  }

  logout() {
    // Lógica para cerrar sesión
    // Navega a la página de inicio
    this.router.navigate(['/']);
  }
}
