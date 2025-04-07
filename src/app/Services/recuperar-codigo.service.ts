import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnviarCodigoEmail } from '../Models/enviarcodigoemailDTO';
import { catchError } from 'rxjs';
import { RecoverypasswordService } from './recoverypassword.service';

export interface ValidarCodigoDTO
{
  Email : string,
  Codigo : string
}

@Injectable({providedIn: 'root'})
export class RecuperarCodigoService {

private readonly ApiUrlValidarCodigo = 'https://z7zsd20t-5148.usw3.devtunnels.ms/api/Usuario/ValidarCodigo';
private readonly ApiUrlReenviarCodigo = 'https://z7zsd20t-5148.usw3.devtunnels.ms/api/Usuario/EnviarCodigo';

constructor(private http: HttpClient, private recoveryService : RecoverypasswordService,) {}

ValidarCodigo(Email: string, Codigo: string): Observable<string> {
  const dto: ValidarCodigoDTO = { Email: Email, Codigo: Codigo };
  return this.http.post<string>(this.ApiUrlValidarCodigo, dto, {responseType: 'text' as 'json'})
    .pipe(
      catchError(error => {
        console.error('Error al validar código', error);
        throw error;
      })
    );
}

reenviarCodigo(email: string): Observable<string> {
  const dto: EnviarCodigoEmail = { Email: email };
  return this.http.post<string>(this.ApiUrlReenviarCodigo, dto)
    .pipe(
      catchError(error => {
        console.error('Error al reenviar código', error);
        throw error;
      })
    );
}
}
