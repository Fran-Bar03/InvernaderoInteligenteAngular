import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../Services/authuser.service';
import { Router } from '@angular/router';
import { authGuard } from './authguard.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

describe('authGuard', () => {
  let authService: AuthService;
  let router: Router;
  let guard: authGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],  // Importa el módulo de pruebas de Router
      providers: [authGuard, AuthService]  // Asegúrate de que los proveedores estén configurados
    });
    
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    guard = TestBed.inject(authGuard); // Se inyecta el guard correctamente
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();  // Verifica que el guard haya sido creado correctamente
  });

  it('should allow access if token exists', () => {
    // Simula que el token está presente
    spyOn(authService, 'obtenerToken').and.returnValue('mock-token');
    
    // Creamos un "mock" de ActivatedRouteSnapshot y RouterStateSnapshot
    const route: ActivatedRouteSnapshot = <ActivatedRouteSnapshot>{};
    const state: RouterStateSnapshot = <RouterStateSnapshot>{};

    const canActivate = guard.canActivate(route, state);
    expect(canActivate).toBeTrue();  // Permite el acceso si el token está presente
  });

  it('should redirect to login if no token exists', () => {
    // Simula que no hay token
    spyOn(authService, 'obtenerToken').and.returnValue(null);
    spyOn(router, 'navigate');  // Simula la redirección

    // Creamos un "mock" de ActivatedRouteSnapshot y RouterStateSnapshot
    const route: ActivatedRouteSnapshot = <ActivatedRouteSnapshot>{};
    const state: RouterStateSnapshot = <RouterStateSnapshot>{};

    const canActivate = guard.canActivate(route, state);
    expect(canActivate).toBeFalse();  // Bloquea el acceso si no hay token
    expect(router.navigate).toHaveBeenCalledWith(['/iniciar-sesion']);  // Verifica que redirige al login
  });
});

