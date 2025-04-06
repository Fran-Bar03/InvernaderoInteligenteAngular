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
  showNav: boolean = true;

  constructor(private router: Router) {}

  isAuthRoute(): boolean {
    return this.router.url.includes('/iniciar-sesion') || this.router.url.includes('/crear-cuenta') || this.router.url.includes('/olvidaste-contrasena') || this.router.url.includes('/modal-codigo') || this.router.url.includes('/recuperar-contrasena') || this.router.url.includes('/recuperar-codigo');
  }
}
