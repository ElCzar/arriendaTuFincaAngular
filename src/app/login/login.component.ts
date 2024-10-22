import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';

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

  constructor(private readonly router: Router) {}

  onSubmit() {
    if (this.loginForm.valid) {
      // la lógica de inicio de sesión
      console.log('Formulario de inicio de sesión válido', this.loginForm.value);
      // Redirigir a la página principal después de iniciar sesión
      this.router.navigate(['/home2']);
    } else {
      // Manejar el caso en que el formulario no es válido
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }
}
