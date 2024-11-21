import { Component, NgModule, OnInit } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Property } from '../../models/property.model'; 
import { Router } from '@angular/router';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-my-properties',
  standalone: true,
  templateUrl: './myproperties.component.html',
  styleUrls: ['./myproperties.component.css'],
  imports: [CommonModule]
})
export class MyPropertiesComponent implements OnInit {
  properties: Property[] = [];
  userEmail: string = '';

  constructor(
    private propertyService: PropertyService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserEmail();
  }

  getUserEmail() {
    this.authService.getUserId().subscribe((userId) => {
      if (userId !== -1) {
        this.userService.getUserInfo(userId).subscribe((user) => {
          this.userEmail = user.email;
          this.loadProperties();
        });
      }
    });
  }

  loadProperties() {
    this.propertyService.getAllProperties().subscribe((data: Property[]) => {
      this.properties = data.filter(property => property.ownerEmail === this.userEmail);
    });
  }

  viewRequests(propertyId: number) {
    this.router.navigate(['/solicitudes', propertyId]);
  }
}
