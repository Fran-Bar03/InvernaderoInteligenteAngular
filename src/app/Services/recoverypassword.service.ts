import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })


export class RecoverypasswordService {

  private readonly recoveryTokenKey = 'recoveryToken';


  async GuardarRecoveryToken (token : string) : Promise<void> 
  {
      try 
      {
        sessionStorage.setItem(this.recoveryTokenKey, token);
      }
      catch (ex)
      {
        console.error(`Error al guardar el token : ${ex}`);
        throw ex;
      }
  }


  ObtenerRecoveyToken(): string | null 
  {
    try 
    {
      return sessionStorage.getItem(this.recoveryTokenKey);
    }
    catch (ex)
    {
      console.error(`Error al obtener el token: ${ex}`);
      return null;
    }
  }

  EliminarRecoveryToken(): void 
  {
    sessionStorage.removeItem(this.recoveryTokenKey);
  }


  ObtenerEmailToken(token : string): string | null 
  {
    try 
    {
      const EmailToken = jwtDecode <{Email?: string}>(token);
      return EmailToken.Email || null;
    }
    catch (ex) 
    {
      console.error(`Error al decodificar el token: ${ex}`);
      return null;
    }
  }
}
