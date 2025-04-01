import { Component } from '@angular/core';
<<<<<<< HEAD
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recuperar-contrasena',
  imports: [RouterLink],
=======
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recuperar-contrasena',
  imports: [CommonModule, ReactiveFormsModule],
>>>>>>> 764a259 (Modificacion en interfaces y agregación de modal)
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
      codigo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
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
