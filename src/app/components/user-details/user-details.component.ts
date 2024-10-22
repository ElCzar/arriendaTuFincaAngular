import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userData: any = {}; // Datos del usuario

  constructor(
    private route: ActivatedRoute, 
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId: string | null = this.route.snapshot.paramMap.get('id'); // Obtener el id de la URL
    if (userId) {
      this.getUserDetails(userId); // Solo llamar si userId no es null
    } else {
      console.error('User ID is null'); // Manejar el caso donde no se encuentra el id
    }
  }
  
  getUserDetails(id: string): void {
    this.userService.getUserById(id).subscribe(
      (data) => {
        this.userData = data;
        console.log('Datos del usuario:', data); // Para verificar los datos
      },
      (error) => {
        console.error('Error al obtener los datos del usuario', error);
      }
    );
  }
}
