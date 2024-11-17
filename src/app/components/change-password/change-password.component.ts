import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  userId: number = -1;
  userEmail: string = '';

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    this.authService.getUserId().subscribe(id => {
      this.userId = id;
      this.loadUserEmail();
    });
  }

  loadUserEmail(): void {
    this.userService.getUserProfile(this.userId).subscribe(
      (profile) => {
        this.userEmail = profile.email;
      },
      (error) => {
        console.error('Error al cargar el perfil del usuario', error);
      }
    );
  }

  changePassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      alert('Las nuevas contraseñas no coinciden');
      return;
    }

    if (!this.currentPassword || !this.newPassword) {
      alert('Las contraseñas no pueden estar vacías');
      return;
    }

    const changePasswordDTO = {
      email: this.userEmail,
      oldPassword: this.currentPassword,
      newPassword: this.newPassword
    };

    this.userService.changePassword(this.userId, changePasswordDTO).subscribe(
      () => {
        alert('Contraseña cambiada exitosamente');
        this.router.navigate(['/home2']);
      },
      (error) => {
        console.error('Error al cambiar la contraseña', error);
        alert('Error al cambiar la contraseña');
      }
    );
  }
}
