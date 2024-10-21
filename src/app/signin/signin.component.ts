import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router para la navegación
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule,HeaderComponent, FooterComponent],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  profilePictureUrl: string | ArrayBuffer | null = null;

  constructor(private readonly router: Router) {}

  // Método para manejar el registro
  onSubmit() {
    // Aquí puedes validar el formulario antes de navegar
    this.router.navigate(['/']); // Redirige a la página principal después de registrarse
  }

  // Método para manejar la selección de archivos
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePictureUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
