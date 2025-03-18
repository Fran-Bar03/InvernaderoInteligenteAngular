import { Routes } from '@angular/router';
import { CrearCuentaComponent } from './Components/crear-cuenta/crear-cuenta.component';
import { PaginaPrincipalComponent } from './Components/pagina-principal/pagina-principal.component';
import { RecuperarContrasenaComponent } from './Components/recuperar-contrasena/recuperar-contrasena.component';
import { UsuariosComponent } from './Components/usuarios/usuarios.component';
import { DetalleInvernaderoComponent } from './Components/detalle-invernadero/detalle-invernadero.component';
import { EstadisticasComponent } from './Components/estadisticas/estadisticas.component';


export const routes: Routes = [

{path : 'crear-cuenta', component: CrearCuentaComponent},
{path : 'pagina-principal', component: PaginaPrincipalComponent},
{path: 'recuperar-contrasena', component : RecuperarContrasenaComponent},
{path: 'usuarios', component: UsuariosComponent},
{path: 'detalle-invernadero', component: DetalleInvernaderoComponent},
{path: 'estadisticas', component: EstadisticasComponent}
];
