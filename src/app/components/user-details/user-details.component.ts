import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { HearderAuthComponent } from '../hearder-auth/hearder-auth.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, HearderAuthComponent, FooterComponent],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId: number = -1;
  userProfile: any = {};
  userEmail: string = '';
  userPassword: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile(this.userId).subscribe(
      (profile) => {
        this.userProfile = profile;
      },
      (error) => {
        console.error('Error al cargar el perfil del usuario', error);
      }
    );
  }

  deleteUser(): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      const email = prompt('Por favor, ingresa tu correo electrónico para confirmar:');
      const password = prompt('Por favor, ingresa tu contraseña para confirmar:');

      if (email && password) {
        const loginDTO = { email, password };
        this.userService.deleteUser(this.userId, loginDTO).subscribe(
          () => {
            alert('Usuario eliminado exitosamente');
            this.router.navigate(['/home']);
          },
          (error) => {
            console.error('Error al eliminar el usuario', error);
            alert('Error al eliminar el usuario');
          }
        );
      } else {
        alert('Correo electrónico y contraseña son requeridos para eliminar el usuario.');
      }
    }
  }
}