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


export const routes: Routes = [

{path : 'crear-cuenta', component: CrearCuentaComponent},
{path: 'recuperar-contrasena', component : RecuperarContrasenaComponent},
{path: 'usuarios', component: UsuariosComponent},
{path: 'iniciar-sesion', component : IniciarSesionComponent},
{path: 'dashboards' , component: DashboardComponent},
{path: 'invernaderos-card' , component: InvernaderosCardComponent},
{path: 'tablero-principal' , component: TableroPrincipalComponent},
{path: 'olvidaste-contrasena', component: OlvidasteContrasenaComponent},
{path: 'recuperar-codigo', component: RecuperarCodigoComponent},
{path: 'modal-codigo' , component: ModalCodigoComponent},
{path: '**',  redirectTo: '/iniciar-sesion', pathMatch: 'full'}
];

export const appProviderRouter = [provideRouter(routes)];
