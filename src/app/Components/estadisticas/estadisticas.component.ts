import { Component, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements AfterViewInit, AfterViewChecked {

  @ViewChild('myChart') myChart!: ElementRef;
  chartInstance: any;

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngAfterViewChecked(): void {
    // Llamar a la actualización del gráfico si hay algún cambio en el DOM
    if (this.chartInstance) {
      this.chartInstance.resize();  // Redibujar el gráfico si el contenedor ha cambiado
    }
  }

  createChart() {
    const ctx = this.myChart.nativeElement.getContext('2d');

    // Si ya existe una instancia del gráfico, destruirla
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    // Crear un nuevo gráfico
    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'My First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(201, 203, 207, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // Método para actualizar el gráfico con nuevos datos (ejemplo)
  updateChartData(newData: number[]) {
    if (this.chartInstance) {
      this.chartInstance.data.datasets[0].data = newData; // Actualiza los datos del gráfico
      this.chartInstance.update(); // Fuerza la actualización del gráfico
    }
  }
}



