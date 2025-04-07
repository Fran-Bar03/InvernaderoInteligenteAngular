import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RegistroService } from '../../Services/registro.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Services/authuser.service';

@Component({
  selector: 'app-crear-cuenta',
  imports: [RouterLink,FormsModule],
  templateUrl: './crear-cuenta.component.html',
  styleUrl: './crear-cuenta.component.css'
})
export class CrearCuentaComponent {

NombreCompleto : string = '';
Email : string = '';
Contrasena : string = '';
ConfirmarContrasena : string = '';
mensajeError : string = ''

constructor (
private registroService : RegistroService,
private router : Router,
private authService : AuthService
) {}


registrar() {
  if (!this.NombreCompleto || !this.Email || !this.Contrasena || !this.ConfirmarContrasena) {
    this.mensajeError = 'Completa todos los campos.';
    return;
  }

  if (this.Contrasena !== this.ConfirmarContrasena) {
    this.mensajeError = 'Las contraseñas no coinciden.';
    return;
  }

  this.registroService.registrarUsuario(this.NombreCompleto, this.Email, this.Contrasena)
    .subscribe({
      next: (token) => {
        this.authService.guardarToken(token);  // Guardar el token en localStorage


        this.NombreCompleto = '';
        this.Email = '';
        this.Contrasena = '';
        this.ConfirmarContrasena = '';
        this.mensajeError = '';

        alert('¡Usuario registrado e iniciado sesión!');
        this.router.navigate(['/tablero-principal']);  // Redirigir al dashboard o página principal
      },
      error: (error) => {
        this.mensajeError = 'Error al registrar el usuario: ' + (error.error || 'Error desconocido');
      }
    });
}

}
