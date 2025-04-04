import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recuperar-contrasena',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrl: './recuperar-contrasena.component.css'
})
export class RecuperarContrasenaComponent {
  recuperarForm: FormGroup;
  codigoForm: FormGroup;
  paso: number = 1; // Paso 1: Solicitar código, Paso 2: Ingresar código

  constructor(private fb: FormBuilder) {
    this.recuperarForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.codigoForm = this.fb.group({
      nuevaContrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', [Validators.required]]
    });
  }

  solicitarCodigo() {
    if (this.recuperarForm.valid) {
      console.log("Código enviado a:", this.recuperarForm.value.email);
      this.paso = 2; // Cambiar al siguiente paso
    }
  }

  cambiarContrasena() {
    if (this.codigoForm.valid) {
      const { nuevaContrasena, confirmarContrasena } = this.codigoForm.value;

      if (nuevaContrasena !== confirmarContrasena) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      alert("Contraseña cambiada exitosamente.");
    }
  }
}
