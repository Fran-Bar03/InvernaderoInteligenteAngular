import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/authuser.service'; // asegúrate que la ruta sea correcta
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.cerrarSesion();
    this.router.navigate(['/iniciar-sesion']);
  }
}
