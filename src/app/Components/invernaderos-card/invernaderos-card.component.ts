import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-invernaderos-card',
  imports: [RouterLink],
  templateUrl: './invernaderos-card.component.html',
  styleUrl: './invernaderos-card.component.css'
})
export class InvernaderosCardComponent {
  @Input() invernadero!: { Nombre: string; Imagen: string };
}
