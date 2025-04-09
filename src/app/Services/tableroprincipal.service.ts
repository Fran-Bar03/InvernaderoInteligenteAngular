import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MostrarInvernadero } from '../Components/tablero-principal/tablero-principal.component';

@Injectable({
  providedIn: 'root'
})
export class TableroprincipalService {
  private readonly APIurl = 'https://z7zsd20t-5148.usw3.devtunnels.ms/api/Invernadero/ListarInvernaderos';
  private readonly APIurlBuscar = 'https://z7zsd20t-5148.usw3.devtunnels.ms/api/Invernadero/BuscarInvernadero';
  private readonly APIurlAgregar = 'https://z7zsd20t-5148.usw3.devtunnels.ms/api/Invernadero/AgregarInvernadero'; // Nueva URL para agregar invernadero

  constructor(private http: HttpClient) { }

  // Método para obtener los invernaderos
  getInvernaderos(): Observable<MostrarInvernadero[]> {
    return this.http.get<MostrarInvernadero[]>(this.APIurl);
  }

  // Método para buscar invernaderos por nombre
  buscarInvernaderos(nombre: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.APIurlBuscar}/buscarInvernaderos?nombre=${nombre}`);
  }

  // Método para agregar un nuevo invernadero
  agregarInvernadero(invernadero: any): Observable<any> {
    return this.http.post<any>(this.APIurlAgregar, invernadero);  // Enviamos la solicitud POST al servidor
  }
}