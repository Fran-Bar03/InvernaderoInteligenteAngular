import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LecturaSensor {
  lecturaId: string;   // ID único de la lectura
  sensorId: string;    // ID único del sensor
  valor: number;       // Valor de la lectura
  estado: boolean;     // Estado de la lectura (activo/inactivo)
  fechaLectura: string;  // Fecha de la lectura (en formato ISO)
}

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  private apiUrl = 'http://localhost:5148/api/LecturaSensor/ObtenerLecturasConInvernadero';

  constructor(private http: HttpClient) {}

  obtenerLecturas(): Observable<LecturaSensor[]> {
    return this.http.get<LecturaSensor[]>(this.apiUrl);  // Cambié el tipo de retorno para que sea un arreglo de LecturaSensor
  }
}