import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-invernaderos-card',
  standalone: true,
  templateUrl: './invernaderos-card.component.html',
  styleUrl: './invernaderos-card.component.css'
})
export class InvernaderosCardComponent {
  @Input() nombre!: string;
  @Input() imagen!: string;
}
