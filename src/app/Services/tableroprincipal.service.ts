import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TableroprincipalService {
  private readonly APIurl = 'https://z7zsd20t-5148.usw3.devtunnels.ms/api/Invernadero/ListarInvernaderos';

  constructor(private http: HttpClient) { }

  getInvernaderos(): Observable<any[]> {
    return this.http.get<any[]>(this.APIurl)
  }

  getInvernaderosName(filtro?: FiltroInvernadero): Observable<any[]> {
    const params = filtro?.nombre ? { nombre: filtro.nombre } : {};
    return this.http.get<any[]>(this.APIurl, { params });
  }
}