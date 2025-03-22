import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IniciarSesionComponent } from "./Components/iniciar-sesion/iniciar-sesion.component";
import { SideBarComponent } from "./Components/side-bar/side-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, IniciarSesionComponent, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'InvernaderoInteligenteAngular';
  showNav : boolean = true; // ✅ Se declara correctamente
  showSidebar : boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Rutas donde la navegación NO se muestra
        const routesWithoutNav = ['/crear-cuenta', '/recuperar-contrasena', '/usuarios', '/iniciar-sesion'];
        this.showNav = !routesWithoutNav.includes(event.url);

        // Rutas donde el sidebar NO se muestra
        const routesWithoutSidebar = ['/crear-cuenta', '/recuperar-contrasena','/invernaderos-card', '/iniciar-sesion'];
        this.showSidebar = !routesWithoutSidebar.includes(event.url);
      }
    });
  }
}


