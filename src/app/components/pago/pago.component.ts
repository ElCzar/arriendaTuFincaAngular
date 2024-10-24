import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {
  pagoForm: FormGroup;
  bancos = ['Banco A', 'Banco B', 'Banco C', 'Banco D'];

  constructor(private fb: FormBuilder) {
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
