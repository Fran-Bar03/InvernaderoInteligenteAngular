import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../Services/authuser.service';
import { noauthGuard } from './noauthguard.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('NoAuthGuard', () => {
  let guard: noauthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        noauthGuard,
        {
          provide: AuthService,
          useValue: {
            obtenerToken: jasmine.createSpy('obtenerToken')
          }
        }
      ]
    });
    guard = TestBed.inject(noauthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return false and redirect to /tablero-principal if token exists', () => {
    // Simula que el usuario está autenticado (tiene token)
    (authService.obtenerToken as jasmine.Spy).and.returnValue('fake-token');

    spyOn(router, 'navigate'); // Es necesario espiar la navegación

    // Llama al guard
    const result = guard.canActivate();

    expect(result).toBeFalse(); // Debe retornar false
    expect(router.navigate).toHaveBeenCalledWith(['/tablero-principal']); // Debe redirigir al tablero principal
  });

  it('should return true if no token exists', () => {
    // Simula que el usuario no está autenticado (no hay token)
    (authService.obtenerToken as jasmine.Spy).and.returnValue(null);

    // Llama al guard
    const result = guard.canActivate();

    expect(result).toBeTrue(); // Debe retornar true
  });
});
