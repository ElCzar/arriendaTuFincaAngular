import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-hearder-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hearder-auth.component.html',
  styleUrls: ['./hearder-auth.component.css']
})
export class HearderAuthComponent implements OnInit {
  menuVisible = false;
  userName = 'Nombre del Usuario'; // Puedes obtener esto de un servicio de usuario
  userId: number = -1;

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.authService.getUserId().subscribe(id => {
      this.userId = id;
      if (this.userId !== -1) {
        this.loadUserName();
      }
    });
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  loadUserName(): void {
    this.userService.getUserProfile(this.userId).subscribe(
      (profile) => {
        this.userName = `${profile.name} ${profile.surname}`;
      },
      (error) => {
        console.error('Error al cargar el nombre del usuario', error);
      }
    );
  }

  viewUser() {
    if (this.userId !== -1) {
      this.router.navigate(['/ver-usuario', this.userId]); // Pasar el ID del usuario como parámetro
    } else {
      console.error('ID de usuario no válido');
    }
  }

  editUser() {
    if (this.userId !== -1) {
      this.router.navigate(['/editar-usuario', this.userId]); // Pasar el ID del usuario como parámetro]);
    } else {
      console.error('ID de usuario no válido');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}