import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface cambiarContrasenaDTO 
{
    Email : string,
    Contrasena : string
}


@Injectable({
  providedIn: 'root'
})



export class RecuperarContrasenaService {

  private readonly ApiUrl = 'https://z7zsd20t-5148.usw3.devtunnels.ms/api/Usuario/CambiarContrasena-Email';

  constructor(private http: HttpClient) { }


CambiarContrasena(Email : string, Contrasena : string, ConfirmarContrasena : string): Observable<string>
{
const dto : cambiarContrasenaDTO = {Email : Email, Contrasena : Contrasena } 
return this.http.post<string>(this.ApiUrl, dto, {responseType : 'text' as 'json'})
}

}

