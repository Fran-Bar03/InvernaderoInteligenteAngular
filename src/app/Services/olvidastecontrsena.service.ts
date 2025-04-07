import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OlvidasteContrsenaService {
  private apiUrl = 'https://z7zsd20t-5148.usw3.devtunnels.ms/api/Usuario/EnviarCodigo';

  constructor(private http: HttpClient) {}

  enviarCodigo(email: string) {
    return this.http.post(this.apiUrl, { Email: email }, {responseType: 'text'});
  }
}