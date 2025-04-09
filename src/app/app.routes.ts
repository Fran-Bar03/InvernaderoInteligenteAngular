import { Routes,provideRouter } from '@angular/router';
import { CrearCuentaComponent } from './Components/crear-cuenta/crear-cuenta.component';
import { RecuperarContrasenaComponent } from './Components/recuperar-contrasena/recuperar-contrasena.component';
import { UsuariosComponent } from './Components/usuarios/usuarios.component';
import { DashboardComponent } from './Components/dashboards/dashboards.component';
import { IniciarSesionComponent } from './Components/iniciar-sesion/iniciar-sesion.component';
import { InvernaderosCardComponent } from './Components/invernaderos-card/invernaderos-card.component';
import { TableroPrincipalComponent } from './Components/tablero-principal/tablero-principal.component';
import { RecuperarCodigoComponent } from './Components/recuperar-codigo/recuperar-codigo.component';
import { OlvidasteContrasenaComponent } from './Components/olvidaste-contrasena/olvidaste-contrasena.component';
import { ModalCodigoComponent } from './Components/modal-codigo/modal-codigo.component';
import { ContenidoLayoutComponent } from './layouts/contenido-layout/contenido-layout.component';
import { AutentificacionesLayoutComponent } from './layouts/autentificaciones-layout/autentificaciones-layout.component';
import { authGuard } from './guards/authguard.guard';
import { noauthGuard } from './guards/noauthguard.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/iniciar-sesion', // O la ruta que tú quieras por defecto
    pathMatch: 'full'
  },
{
    path: '',
    component: AutentificacionesLayoutComponent,
    children: [
      { path: 'iniciar-sesion', component: IniciarSesionComponent, canActivate : [noauthGuard] },
      { path: 'crear-cuenta', component: CrearCuentaComponent },
      { path: 'recuperar-contrasena', component: RecuperarContrasenaComponent },
      { path: 'recuperar-codigo', component: RecuperarCodigoComponent },
      { path: 'olvidaste-contrasena', component: OlvidasteContrasenaComponent }
    ]
  },
  
  // Rutas que usan el Layout Principal (con sidebar)
  {
    path: '',
    component: ContenidoLayoutComponent,
    children: [
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'dashboards', component: DashboardComponent, canActivate: [authGuard] },
      { path: 'invernaderos-card', component: InvernaderosCardComponent },
      { path: 'tablero-principal', component: TableroPrincipalComponent, canActivate : [authGuard] },
      { path: 'modal-codigo', component: ModalCodigoComponent }
    ]
  }
];

export const appProviderRouter = [provideRouter(routes)];