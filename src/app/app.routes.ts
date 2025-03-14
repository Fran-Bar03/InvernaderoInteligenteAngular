import { Routes } from '@angular/router';
import { CrearCuentaComponent } from './Components/CrearCuenta/crear-cuenta/crear-cuenta.component';
import { PaginaPrincipalComponent } from './Components/PaginaPrincipal/pagina-principal/pagina-principal.component';
import { RecuperarContrasenaComponent } from './Components/RecuperarContrasena/recuperar-contrasena/recuperar-contrasena.component';
import { UsuariosComponent } from './Components/Usuarios/usuarios/usuarios.component';


export const routes: Routes = [

{path : 'Crear-Cuenta', component: CrearCuentaComponent},
{path : 'Pagina-Principal', component: PaginaPrincipalComponent},
{path: 'Recuperar-Contrasena', component : RecuperarContrasenaComponent},
{path: 'Usuarios', component: UsuariosComponent},
{ path: '', redirectTo: '/pagina-principal', pathMatch: 'full' }
];
