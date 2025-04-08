import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Invernadero {
  invernaderoId: string; // Este campo no se enviará al crear el usuario
  nombre: string;
  nombrePlanta: string;
  tipoPlanta: string;
  imagen: string; // Este campo no se enviará al crear el usuario
  minTemperatura: number;
  maxTemperatura: number;
  minHumedad: number;
  maxHumedad: number;
  usaurios: string[]; // Este campo se enviará vacío
  sensores: string[]; // Este campo se enviará vacío
}

@Injectable({
  providedIn: 'root'
})

export class InvernaderoService{
  
  private readonly APIurl = 'https://z7zsd20t-5148.usw3.devtunnels.ms/api/Invernadero/CrearInvernadero';
  private readonly APIurlUsuarios = 'https://z7zsd20t-5148.usw3.devtunnels.ms/api/Usuario/MostrarUsuarios';
  private readonly APIurlSensores = 'https://z7zsd20t-5148.usw3.devtunnels.ms/api/Sensor/MostarSensores';

  constructor(private http: HttpClient) { }

  // Registrar un nuevo usuario
  registrarInvernadero(invernadero: Invernadero): Observable<Invernadero> {
    // Enviar solo los datos necesarios: nombreCompleto, email, contrasena, rol y invernaderos vacíos
    const invernaderoRegistrado = {
      nombre: invernadero.nombre,
      nombrePlanta: invernadero.nombrePlanta,
      tipoPlanta: invernadero.tipoPlanta,
      imagen: invernadero.imagen,
      minTemperatura: invernadero.minTemperatura,
      maxTemperatura: invernadero.maxTemperatura,
      minHumedad: invernadero.minHumedad,
      maxHumedad: invernadero.maxHumedad,
      usuarios: [], // Este campo se enviará vacío
      sensores: [] // Este campo se enviará vacío
    };

    return this.http.post<Invernadero>(this.APIurl, invernaderoRegistrado);
  }
}

  /*mostrarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.APIurlUsuarios);
  }

  mostrarSensores(): Observable<any[]> {
    return this.http.get<any[]>(this.APIurlSensores);
  }
}*/
  