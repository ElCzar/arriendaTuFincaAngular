import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hearder-auth.component.html',
  styleUrls: ['./hearder-auth.component.css']
})
export class HearderAuthComponent implements OnInit {
  menuVisible = false;
  userId: number = -1;
  userProfile: any = {
    imageId: 0
  };
  userName: string = '';
  profileImageUrl: string = '';

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.authService.getUserId().subscribe(id => {
      this.userId = id;
      if (this.userId !== -1) {
        this.loadUserProfile();
      } else {
        console.error('ID de usuario no válido');
      }
    });
  }

  loadUserProfile(): void {
    this.userService.getUserProfile(this.userId).subscribe(
      (profile) => {
        this.userProfile = profile;
        this.profileImageUrl = this.getProfileImageUrl(profile.imageId);
        this.userName = `${profile.name} ${profile.surname}`;
      },
      (error) => {
        console.error('Error al cargar el perfil del usuario', error);
      }
    );
  }

  getProfileImageUrl(imageId: number): string {
    if (!imageId || imageId === 0) {
      return 'assets/sin_imagen.png'; // Ruta de la imagen predeterminada
    }
    return `http://localhost:8080/image/${imageId}`;
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  viewUser() {
    if (this.userId !== -1) {
      this.router.navigate(['/ver-usuario', this.userId]);
    } else {
      console.error('ID de usuario no válido');
    }
  }

  editUser() {
    if (this.userId !== -1) {
      this.router.navigate(['/editar-usuario', this.userId]);
    } else {
      console.error('ID de usuario no válido');
    }
  }

  createProperty() {
    if (this.userId !== -1) {
      this.router.navigate(['/crear-propiedad', this.userId]);
    } else {
      console.error('ID de usuario no válido');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToHome2() {
    this.router.navigate(['/home2']);
  }

  changePassword() {
    this.router.navigate(['/cambiar-contrasena']);
  }

  goToMyProperties() {
    this.router.navigate(['/mis-propiedades']);
  }

  goToMyRequests() {
    this.router.navigate(['/mis-solicitudes', this.userId]);
  }
}