import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent {
  constructor(private readonly router: Router, private authService: AuthService) {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión después de cerrar sesión
  }
}