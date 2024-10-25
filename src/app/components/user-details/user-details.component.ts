import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from '../../footer/footer.component';


@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId: number = -1;
  userProfile: any = {};

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id']; // Asegúrate de que el ID del usuario se obtiene correctamente
      if (!isNaN(this.userId) && this.userId !== -1) {
        this.loadUserProfile();
      } else {
        this.router.navigate(['/login']); // Redirige a la página de inicio de sesión si no está autenticado
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
}