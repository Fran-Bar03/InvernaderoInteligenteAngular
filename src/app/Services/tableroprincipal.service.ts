import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TableroprincipalService {
  private readonly APIurl = 'https://z7zsd20t-5148.usw3.devtunnels.ms/api/Invernadero/ListarInvernaderos';
  private readonly APIurlBuscar = 'https://z7zsd20t-5148.usw3.devtunnels.ms/api/Invernadero/BuscarInvernadero';

  constructor(private http: HttpClient) { }

  getInvernaderos(): Observable<any[]> {
    return this.http.get<any[]>(this.APIurl)
  }

  buscarInvernaderos(nombre: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.APIurlBuscar}/buscarInvernaderos?nombre=${nombre}`);
  }
}

