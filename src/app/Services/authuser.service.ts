import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginDTO {
  email: string;
  contrasena: string;
}

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly loginUrl = 'https://z7zsd20t-5148.usw3.devtunnels.ms/api/Usuario/Login'; 

  constructor(private http: HttpClient) { }

  login(email: string, contrasena: string): Observable<string> {
    const dto: LoginDTO = { email, contrasena };
    return this.http.post<string>(this.loginUrl, dto, {responseType : 'text' as 'json'});
  }

  guardarToken(token: string): void {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
  }

}

