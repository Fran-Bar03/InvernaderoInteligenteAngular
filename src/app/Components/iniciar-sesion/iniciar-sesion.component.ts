import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/authuser.service';  // Importa el servicio de autenticación
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-iniciar-sesion',
  imports : [RouterLink, ReactiveFormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  loginForm!: FormGroup;
  loading: boolean = false;
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicializamos el formulario reactivo con los controles y validaciones
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // El email es obligatorio y debe tener formato de correo electrónico
      contrasena: ['', [Validators.required, Validators.minLength(6)]]  // La contraseña es obligatoria y debe tener al menos 6 caracteres
    });
  }

  login(): void {
    this.mensajeError = '';  // Limpiar mensaje de error antes de cada intento de login
  
    if (this.loginForm.invalid) {
      // Marcar todos los campos como tocados para que se muestren los errores
      this.loginForm.markAllAsTouched();
      this.mensajeError = 'Por favor ingrese un correo y una contraseña válidos.';
      return;
    }
  
    const { email, contrasena } = this.loginForm.value;  // Desestructuramos el valor del formulario
  
    this.loading = true;  // Activar el estado de carga
  
    // Llamamos al servicio para realizar la autenticación
    this.authService.login(email, contrasena).subscribe(
      (token: string) => {
        this.authService.guardarToken(token);  // Guardamos el token en localStorage
        this.loading = false;  // Desactivamos el estado de carga
        this.router.navigate(['/tablero-principal']);  // Redirigimos al tablero principal
      },
      (error) => {
        this.loading = false;  // Desactivamos el estado de carga
        this.mensajeError = 'Credenciales incorrectas, por favor intente de nuevo.';  // Mostramos el mensaje de error
        console.error(error);  // Imprimimos el error en consola para debugging
      }
    );
  }
  
}
