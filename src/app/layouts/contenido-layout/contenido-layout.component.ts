import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../../Components/side-bar/side-bar.component';

@Component({
  selector: 'app-contenido-layout',
  imports: [ RouterOutlet, SideBarComponent ],
  templateUrl: './contenido-layout.component.html',
  styleUrl: './contenido-layout.component.css'
})
export class ContenidoLayoutComponent {

}
