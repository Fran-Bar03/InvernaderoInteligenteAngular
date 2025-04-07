import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RecuperarContrasenaService } from '../../Services/recuperar-contrasena.service';
import { RecoverypasswordService } from '../../Services/recoverypassword.service';
import { AuthService } from '../../Services/authuser.service';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrl: './recuperar-contrasena.component.css'
})
export class RecuperarContrasenaComponent implements OnInit {

  codigoForm!: FormGroup;

  Email: string = '';
  token: string = '';
  loading: boolean = false;
  mensajeError: string = '';
  mensajeExito: string = '';

  constructor(
    private recuperarContrasena: RecuperarContrasenaService,
    private recoveryService: RecoverypasswordService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();

    this.codigoForm = this.fb.group({
      nuevaContrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', [Validators.required]]
    });
  }

  cargarDatosIniciales(): void {
    this.token = this.recoveryService.ObtenerRecoveyToken() ?? '';
    if (this.token) {
      this.Email = this.recoveryService.ObtenerEmailToken(this.token) ?? '';
    }
  }

  cambiarContrasena(): void {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (this.codigoForm.invalid) {
      this.mensajeError = 'Por favor llena todos los campos correctamente.';
      return;
    }

    const contrasena = this.codigoForm.value.nuevaContrasena;
    const confirmar = this.codigoForm.value.confirmarContrasena;

    if (contrasena !== confirmar) {
      this.mensajeError = 'Las contraseñas no coinciden.';
      return;
    }

    if (!this.Email) {
      this.mensajeError = 'No se encontró el correo electrónico. Intenta nuevamente.';
      return;
    }

    this.loading = true;

    // Primero, cambiamos la contraseña
    this.recuperarContrasena.CambiarContrasena(this.Email, contrasena, confirmar).subscribe(
      response => {
        // Después de cambiar la contraseña, eliminamos el token anterior
        this.authService.cerrarSesion();  // Eliminar el token anterior (si lo hay)

        // Ahora, iniciamos sesión con la nueva contraseña
        this.authService.login(this.Email, contrasena).subscribe(
          (token: string) => {
            if (token) {
              this.authService.guardarToken(token);  // Guardamos el nuevo token
              this.recoveryService.EliminarRecoveryToken();  // Limpiamos el token de recuperación

              this.loading = false;
              this.mensajeExito = 'Contraseña actualizada y sesión iniciada correctamente. Redirigiendo...';

              // Redirigimos al usuario después de iniciar sesión
              setTimeout(() => {
                this.router.navigate(['/tablero-principal']);
              }, 2000);
            } else {
              this.mensajeError = 'No se pudo obtener un token de sesión. Intenta nuevamente.';
              this.loading = false;
            }
          },
          (loginError) => {
            this.loading = false;
            this.mensajeError = 'Contraseña cambiada, pero no se pudo iniciar sesión automáticamente.';
            console.error(loginError);
          }
        );
      },
      (error) => {
        this.loading = false;
        this.mensajeError = 'Ocurrió un error al cambiar la contraseña. Intenta nuevamente.';
        console.error(error);
      }
    );
  }
}
