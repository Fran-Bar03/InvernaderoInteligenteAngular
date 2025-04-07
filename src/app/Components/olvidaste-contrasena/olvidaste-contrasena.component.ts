import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecoverypasswordService } from '../../Services/recoverypassword.service';
import { OlvidasteContrsenaService } from '../../Services/olvidastecontrsena.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-olvidaste-contrasena',
  imports : [CommonModule,FormsModule],
  templateUrl: './olvidaste-contrasena.component.html',
  styleUrl: './olvidaste-contrasena.component.css'
})
export class OlvidasteContrasenaComponent {
  email: string = '';
  mensajeError: string = '';
  isLoading: boolean = false;

  constructor(
    private olvidastecontrsenaservice: OlvidasteContrsenaService,
    private recoverypasswordservice: RecoverypasswordService,
    private router: Router
  ) {}

  async enviarCodigo() {
    if (!this.email) {
      this.mensajeError = 'Por favor ingresa tu correo electrónico';
      return;
    }

    this.isLoading = true;
    this.mensajeError = '';

    try {
      const response = await this.olvidastecontrsenaservice.enviarCodigo(this.email).toPromise();
      console.log('Respuesta recibida:', response);
      
      if (response) {
        this.recoverypasswordservice.GuardarRecoveryToken(response);
        this.router.navigate(['/recuperar-codigo']);
      } else {
        this.mensajeError = 'No se recibió un token válido';
      }
    } catch (error: any) {
      this.mensajeError = error.error?.message || 'Error al enviar el código. Intenta nuevamente.';
    } finally {
      this.isLoading = false;
    }
  }
}
