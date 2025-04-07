import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class InvernaderoService{
  
  private readonly APIurl = 'https://z7zsd20t-5148.usw3.devtunnels.ms/api/Invernadero/CrearInvernadero';
  private readonly APIurlUsuarios = 'https://z7zsd20t-5148.usw3.devtunnels.ms/api/Usuario/MostrarUsuarios';
  private readonly APIurlSensores = 'https://z7zsd20t-5148.usw3.devtunnels.ms/api/Sensor/MostarSensores';

  constructor(private http: HttpClient) { }

  registrarInvernadero(Nombre: string, NombrePlanta: string, TipoPlanta: string, MinTemperatura: string, MaxTemperatura: string, MinHumedad: string, MaxHumedad: string, Usuarios: string[], Sensores: string[]) {
    return this.http.post(this.APIurl, { Nombre, NombrePlanta, TipoPlanta, MinTemperatura, MaxTemperatura, MinHumedad, MaxHumedad, Usuarios, Sensores });
  }

  mostrarUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.APIurlUsuarios);
  }

  mostrarSensores(): Observable<any[]> {
    return this.http.get<any[]>(this.APIurlSensores);
  }
}
  