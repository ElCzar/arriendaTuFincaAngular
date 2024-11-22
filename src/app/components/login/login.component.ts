import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../models/login.model';
import { Token } from '../../models/token.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private readonly router: Router, private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const login: Login = this.loginForm.value;
      this.authService.login(login).subscribe(
        (token: Token) => {
          console.log('Login successful', token);
          console.log('Full token:', JSON.stringify(token)); // Imprimir el token completo en la consola
          // Redirigir al usuario a la página de inicio o a otra página
          this.router.navigate(['/home2']);
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }
}