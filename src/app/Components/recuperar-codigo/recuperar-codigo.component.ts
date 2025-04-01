import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recuperar-codigo',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recuperar-codigo.component.html',
  styleUrl: './recuperar-codigo.component.css'
})
export class RecuperarCodigoComponent {
  codigoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.codigoForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      nuevacontrasena: ['', [Validators.required, Validators.minLength(8)]],
      confirmarcontrasena: ['', [Validators.required]]
    });
  }
  cambiarContrasena() {
    if (this.codigoForm.valid) {
      const { nuevaContrasena, confirmarContrasena } = this.codigoForm.value;

      if (nuevaContrasena !== confirmarContrasena) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      console.log("Código ingresado:", this.codigoForm.value.codigo);
      console.log("Nueva contraseña:", nuevaContrasena);
      alert("Contraseña cambiada exitosamente.");
    }
  }
}
