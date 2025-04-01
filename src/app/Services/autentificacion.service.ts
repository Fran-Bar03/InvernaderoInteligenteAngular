import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {
  private apiUrl = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) { }

  enviarResetContrasena(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/recuperar-contrasena`, { email });
  }

  resetContrasena(token: string, nuevaContrasena: string): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/reset-contrasena`, { token, nuevaContrasena });
  }
}
