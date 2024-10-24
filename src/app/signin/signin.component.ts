import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router para la navegación
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'; // Importa ReactiveFormsModule y Validators
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent], // Agrega ReactiveFormsModule aquí
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  profilePictureUrl: string | ArrayBuffer | null = null;

  // Define el formulario y los validadores
  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)
  });

  constructor(private readonly router: Router) {}

  // Método para manejar el registro
  onSubmit() {
    if (this.registerForm.valid) {
      // Aquí puedes validar el formulario antes de navegar
      this.router.navigate(['/login']); // Redirige a la página de inicio de sesión después de registrarse
    } else {
      // Manejar el caso en que el formulario no es válido
      alert('Por favor, completa todos los campos obligatorios.');
    }
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
