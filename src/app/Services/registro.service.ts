import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegistrarseDTO {
  NombreCompleto : string,
  Email : string, 
  Contrasena : string
}


@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private apiUrl = 'https://z7zsd20t-5148.usw3.devtunnels.ms/api/Usuario/RegistrarUsuario';

  constructor(private http : HttpClient) { }


  registrarUsuario(nombreCompleto : string, email : string, contrasena : string): Observable<string> {
    const dto : RegistrarseDTO = {NombreCompleto : nombreCompleto,Email : email ,Contrasena : contrasena};
    return this.http.post<string>(this.apiUrl,dto, {responseType : 'text' as 'json'})
  }

}
