import { Component } from '@angular/core';
import { InvernaderosCardComponent } from "../invernaderos-card/invernaderos-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tablero-principal',
  imports: [InvernaderosCardComponent, CommonModule],
  templateUrl: './tablero-principal.component.html',
  styleUrls: ['./tablero-principal.component.css']
})
export class TableroPrincipalComponent {
  invernaderos = [
    { nombre: 'Invernadero Norte', imagen: 'https://i.ibb.co/nMvy4tqx/norte.png' },
    { nombre: 'Invernadero Sur', imagen: 'https://i.ibb.co/Xk4BjxCm/sur.png' },
    { nombre: 'Invernadero Este', imagen: 'https://i.ibb.co/hFfqwNcN/este.png' },
    { nombre: 'Invernadero Oeste', imagen: 'https://i.ibb.co/nMQ0cHHP/oeste.png' },
    { nombre: 'Invernadero Central', imagen: '' },
    { nombre: 'Invernadero Poniente', imagen: '' }
  ]
}