import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HearderAuthComponent } from '../hearder-auth/hearder-auth.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HearderAuthComponent, FooterComponent],
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {
  requestForm: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.requestForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fechaInicio: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      numeroResidentes: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      alert('Solicitud de arriendo enviada con éxito');
    }
  }
}
