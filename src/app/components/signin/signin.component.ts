import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  profilePictureUrl: string | ArrayBuffer | null = null;

  // Define el formulario y los validadores
  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    host: new FormControl(false),  // checkbox
    renter: new FormControl(false) // checkbox
  }, { validators: this.roleValidator });

  constructor(private readonly router: Router, private userService: UserService) {}

  // Método para manejar el registro
  onSubmit() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      console.log('Enviando datos del formulario:', formValue);  // Verificar qué se envía
  
      this.userService.registerUser(formValue).subscribe(
        (response) => {
          console.log('Usuario registrado exitosamente', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error al registrar el usuario', error);
          alert('Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos obligatorios y selecciona al menos un rol.');
    }
  }
  

  // Método para verificar que al menos un rol está seleccionado
  roleValidator(control: AbstractControl): ValidationErrors | null {
    const isHost = control.get('host')?.value;
    const isRenter = control.get('renter')?.value;
    if (!isHost && !isRenter) {
      return { roleRequired: true };
    }
    return null;
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
