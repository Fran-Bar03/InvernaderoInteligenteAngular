import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../Services/authuser.service';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})

export class authGuard implements CanActivate {

  constructor(
  private authService : AuthService,
  private router : Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const token = this.authService.obtenerToken();

    if (token) {
      // Si hay un token, permite el acceso
      return true;
    } else {
      // Si no hay un token, redirige al login
      this.router.navigate(['/iniciar-sesion']);
      return false;
    }
  }

}

