import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private readonly router: Router, private authService: AuthService) {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log('Usuario autenticado exitosamente', response);
          this.router.navigate(['/dashboard']); // Redirige a la página del dashboard después de iniciar sesión
        },
        (error) => {
          console.error('Error al iniciar sesión', error);
          alert('Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }
}
