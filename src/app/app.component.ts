import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IniciarSesionComponent } from "./Components/iniciar-sesion/iniciar-sesion.component";
import { SideBarComponent } from "./Components/side-bar/side-bar.component";
import { ModalCodigoComponent } from "./Components/modal-codigo/modal-codigo.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, IniciarSesionComponent, SideBarComponent, ModalCodigoComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'InvernaderoInteligenteAngular';
  showNav: boolean = true; // ✅ Se declara correctamente

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Oculta la navegación en estas rutas
        this.showNav = !['/crear-cuenta', '/recuperar-contrasena', '/pagina-principal', '/usuarios', '/iniciar-sesion', '/dashboards', '/tablero-principal', '/invernaderos-card'].includes(event.url);
      }
    });
  }
}
