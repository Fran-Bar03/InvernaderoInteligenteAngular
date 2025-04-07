import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../Services/authuser.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class noauthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Si hay un token en el localStorage, redirige a la página principal o dashboard
    if (this.authService.obtenerToken()) {
      this.router.navigate(['/tablero-principal']); // Redirige al tablero principal
      return false;  // Bloquea el acceso a la página de login
    }
    return true;  // Permite el acceso a la página de login si no hay token
  }
}
