import { Component,OnInit } from '@angular/core';
import { Chart } from 'chart.js';



@Component({
  selector: 'app-estadisticas',
  imports: [],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent implements OnInit {
  public chart: any;

  constructor() { }

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('grafico', {
      type: 'line', // Tipo de gráfico (línea)
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'], // Etiquetas del eje X
        datasets: [{
          label: 'Temperatura', // Nombre de la serie de datos
          data: [22, 25, 28, 24, 20], // Datos de la serie (temperaturas)
          borderColor: 'rgba(75, 192, 192, 1)', // Color de la línea
          borderWidth: 2, // Ancho de la línea
          fill: false // No rellenar el área debajo de la línea
        }]
      },
      options: {
        responsive: true,
        scales: { 

          
        }
      }
    });
  }
}

function createChart() {
  throw new Error('Function not implemented.');
}

