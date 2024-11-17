import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userId: number = -1;
  userProfile: any = {
    email: '',
    name: '',
    surname: '',
    phone: '',
    isHost: false,
    isRenter: false,
    imageId: 0
  };
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUserId().subscribe(id => {
      this.userId = id;
      if (this.userId !== -1) {
        this.loadUserProfile();
      } else {
        console.error('ID de usuario no válido');
        this.router.navigate(['/login']);
      }
    });
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

  updateUserProfile(): void {
    this.userService.updateUserProfile(this.userId, this.userProfile).subscribe(
      () => {
        console.log('Perfil actualizado correctamente');
        if (this.selectedFile) {
          this.uploadProfilePicture();
        } else {
          this.router.navigate(['/ver-usuario', this.userId]);
        }
      },
      (error) => {
        console.error('Error al actualizar el perfil del usuario', error);
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadProfilePicture(): void {
    if (this.selectedFile) {
      console.log('Archivo seleccionado:', this.selectedFile);
      const formData = new FormData();
      formData.append('photo', this.selectedFile); // Cambiado a 'photo'
  
      this.userService.uploadProfilePicture(this.userId, this.selectedFile!, formData).subscribe(
        () => {
          console.log('Foto de perfil subida correctamente');
          this.router.navigate(['/ver-usuario', this.userId]);
        },
        (error) => {
          console.error('Error al subir la foto de perfil', error);
        }
      );
    }
  }
}
