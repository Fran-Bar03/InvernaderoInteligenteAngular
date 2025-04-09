import { Component, OnInit } from '@angular/core';
import { SensorService, LecturaSensor } from '../../Services/sensor.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private sensorService: SensorService) {}

  ngOnInit(): void {
    this.sensorService.obtenerLecturas().subscribe(data => {
      console.log("Datos obtenidos:", data);  // Verifica que los datos sean correctos

      // Filtrar los datos por sensorId para obtener los valores de ambos sensores
      const sensor1Data = data.filter((x: LecturaSensor) => x.sensorId === '67f45bceaa2788f794bb2105'); // Ejemplo de sensorId
      const sensor2Data = data.filter((x: LecturaSensor) => x.sensorId === '67f45be3aa2788f794bb2106'); // Otro sensorId

      console.log("Sensor 1 Data:", sensor1Data);  // Verifica los datos del sensor 1
      console.log("Sensor 2 Data:", sensor2Data);  // Verifica los datos del sensor 2

      // Crear la gráfica con los valores de ambos sensores
      this.crearGrafica('chart1', sensor1Data, sensor2Data);
    });
  }
  

  // Función para crear la gráfica con ambos sensores
crearGrafica(canvasId: string, sensor1Data: any[], sensor2Data: any[]) {
  // Generar las etiquetas para la gráfica (usaremos los índices como etiquetas)
  const labels = sensor1Data.map((_, index) => index + 1);  // Índices 1, 2, 3, ...

  // Obtener los valores de cada sensor
  const sensor1Valores = sensor1Data.map(d => Number(d.valor));  // Convertir a número
  const sensor2Valores = sensor2Data.map(d => Number(d.valor));  // Convertir a número

  // Obtener el canvas por su id
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

  if (canvas) {
    // Crear la gráfica con los datos de ambos sensores
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,  // Usamos los índices como etiquetas en el eje X
        datasets: [
          {
            label: 'Temperatura',  // Cambié el nombre del sensor 1 a "Temperatura"
            data: sensor1Valores,  // Datos del sensor 1
            borderColor: 'rgba(75, 192, 192, 1)',  // Color para sensor 1
            borderWidth: 2,
            tension: 0.3,
            fill: false
          },
          {
            label: 'Humedad',  // Cambié el nombre del sensor 2 a "Humedad"
            data: sensor2Valores,  // Datos del sensor 2
            borderColor: 'rgba(255, 159, 64, 1)',  // Color para sensor 2
            borderWidth: 2,
            tension: 0.3,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Lectura'  // Las etiquetas en el eje X serán las lecturas (índices)
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Valor'  // En el eje Y mostraremos los valores de las lecturas
            }
          }
        }
      }
    });
  }
} 
}
