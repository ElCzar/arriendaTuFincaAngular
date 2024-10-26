import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HearderAuthComponent } from "../hearder-auth/hearder-auth.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HearderAuthComponent, FooterComponent],
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent {
  pagoForm: FormGroup;
  bancos = ['Banco A', 'Banco B', 'Banco C', 'Banco D'];

  constructor(private readonly fb: FormBuilder) {
    this.pagoForm = this.fb.group({
      valor: [{ value: 1000000, disabled: true }, Validators.required],
      banco: ['', Validators.required],
      numeroCuenta: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  onSubmit() {
    if (this.pagoForm.valid) {
      alert('Pago realizado con éxito');
    }
  }
}
