import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  usuarioId: string; // Este campo no se enviará al crear el usuario
  nombreCompleto: string;
  email: string;
  contrasena: string;
  rol: number;
  invernaderos: string[]; // Este campo se enviará vacío
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'https://z7zsd20t-5148.usw3.devtunnels.ms/api/Usuario/MostrarUsuarios';
  private apiUrlRegistrar = 'https://z7zsd20t-5148.usw3.devtunnels.ms/api/Usuario/CrearCuenta';

  constructor(private http: HttpClient) {}

  // Obtener la lista de usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Registrar un nuevo usuario
  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    // Enviar solo los datos necesarios: nombreCompleto, email, contrasena, rol y invernaderos vacíos
    const usuarioRegistrado = {
      nombreCompleto: usuario.nombreCompleto,
      email: usuario.email,
      contrasena: usuario.contrasena,
      rol: usuario.rol, // Ahora podemos enviar el rol seleccionado por el usuario
      invernaderos: [] // Enviar invernaderos vacío
    };

    return this.http.post<Usuario>(this.apiUrlRegistrar, usuarioRegistrado);
  }
}