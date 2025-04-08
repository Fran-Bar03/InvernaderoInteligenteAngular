import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../Models/UsuarioDto';
import { UsuariosService } from '../../Services/usuarios.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  imports: [FormsModule, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];  // Array que almacenará los usuarios
  nuevoUsuario = {
    nombreCompleto: '',
    email: '',
    contrasena: '',
    rol: 2,
    invernaderos: [],
  };

  constructor(private usuarioService: UsuariosService) {}

  ngOnInit(): void {
    // Obtener los usuarios desde la API
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;  // Asignar la respuesta al array 'usuarios'
        console.log('Usuarios recibidos:', this.usuarios);
      },
      error: (error) => {
        console.error('Error al obtener los usuarios:', error);
      },
    });
  }

  // Método para registrar un nuevo usuario
  registrarUsuario(): void {
    // Crear un objeto de tipo Usuario para el registro
    const usuarioParaRegistrar: Usuario = {
      usuarioId: '',  // Este campo no se necesita al registrar, se generará automáticamente
      nombreCompleto: this.nuevoUsuario.nombreCompleto,
      email: this.nuevoUsuario.email,
      contrasena: this.nuevoUsuario.contrasena,
      rol: this.nuevoUsuario.rol,  // El rol es asignado por el usuario
      invernaderos: []  // No se envían invernaderos
    };

    // Llamar al servicio para registrar el usuario
    this.usuarioService.registrarUsuario(usuarioParaRegistrar).subscribe({
      next: (data) => {
        console.log('Usuario registrado:', data);
        this.usuarios.push(data); // Agregar el nuevo usuario a la lista local

        // Limpiar el formulario después de registrar
        this.nuevoUsuario = {
          nombreCompleto: '',
          email: '',
          contrasena: '',
          rol: 2,
          invernaderos: []
        };
      },
      error: (error) => {
        console.error('Error al registrar el usuario:', error);
      }
    });
  }
}


  
  



    







