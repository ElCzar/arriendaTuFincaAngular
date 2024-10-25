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
   //
  }
  
}