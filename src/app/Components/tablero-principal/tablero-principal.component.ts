import { Component, OnInit } from '@angular/core';
import { TableroprincipalService } from '../../Services/tableroprincipal.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InvernaderosCardComponent } from '../invernaderos-card/invernaderos-card.component';

export interface CrearInvernadero {
  Nombre: string;
  NombrePlanta: string;
  TipoPlanta: string;
  MinTemperatura: number;
  MaxTemperatura: number;
  MinHumedad: number;
  MaxHumedad: number;
  Usuarios: String;
  Sensores: string;
  Imagen: string;
  InvernaderoId?: string; // Este se genera automáticamente en la base de datos
}

export interface MostrarInvernadero {
  Nombre: string;
  Imagen: string;
}

@Component({
  selector: 'app-tablero',
  imports : [FormsModule,CommonModule, InvernaderosCardComponent],
  templateUrl: './tablero-principal.component.html',
  styleUrls: ['./tablero-principal.component.css']
})
export class TableroPrincipalComponent implements OnInit {
  mostrarInv: MostrarInvernadero[] = []; // Lista de invernaderos para mostrar
  invernaderos: CrearInvernadero[] = []; // Lista de invernaderos
  nuevoInvernadero: any = {
    Nombre: '',
    NombrePlanta: '',
    TipoPlanta: '',
    MinTemperatura: 0,
    MaxTemperatura: 0,
    MinHumedad: 0,
    MaxHumedad: 0,
    Usuarios: '',
    Sensores: '',
    Imagen: ''
  };
  mostrarModalAgregar = false;

  nombreBusqueda : string = '';

  constructor(private tableroService: TableroprincipalService) {}

  ngOnInit(): void {
    this.mostrarInvernaderos(); // Cargar los invernaderos al inicio
    this.agregarInvernadero();
  }

  // Método para obtener los invernaderos
  mostrarInvernaderos(): void {
    this.tableroService.getInvernaderos().subscribe(
      (response) => {
        this.mostrarInv = response.map((item: any) => ({
          Nombre: item.invernadero.nombre,
          Imagen: item.invernadero.imagen
        }));
      },
      (error) => {
        console.error('Error al obtener los invernaderos:', error);
      }
    );
  }

  // Método para abrir el modal
  abrirModalAgregar(): void {
    this.mostrarModalAgregar = true;
  }

  // Método para cerrar el modal
  cerrarModalAgregar(): void {
    this.mostrarModalAgregar = false;
  }

  agregarInvernadero(): void {
    // Convertir las propiedades de Usuarios y Sensores en arrays, si no están vacías.
    if (this.nuevoInvernadero.Usuarios) {
      // Usamos split para separar por coma, y map para quitar los espacios extra
      this.nuevoInvernadero.Usuarios = this.nuevoInvernadero.Usuarios
        .split(',')         // Separar por coma
        .map((usuario: string) => usuario.trim());  // Especificamos que 'usuario' es de tipo 'string'
    }
  
    if (this.nuevoInvernadero.Sensores) {
      // Usamos split para separar por coma, y map para quitar los espacios extra
      this.nuevoInvernadero.Sensores = this.nuevoInvernadero.Sensores
        .split(',')         // Separar por coma
        .map((sensor: string) => sensor.trim());  // Especificamos que 'sensor' es de tipo 'string'
    }
  
    // Llamar al servicio para agregar el invernadero
    this.tableroService.agregarInvernadero(this.nuevoInvernadero).subscribe(
      (response) => {
        console.log('Invernadero agregado:', response);
        this.mostrarInvernaderos(); // Actualizamos la lista de invernaderos
        this.cerrarModalAgregar(); // Cerramos el modal
      },
      (error) => {
        console.error('Error al agregar invernadero:', error);
      }
    );
  }

  buscarInvernaderos(): void {
    if (this.nombreBusqueda.trim()) {
      // Si el campo de búsqueda no está vacío, realizar la búsqueda
      this.tableroService.buscarInvernaderos(this.nombreBusqueda).subscribe(
        (response) => {
          // Filtrar los resultados que coinciden con el nombre
          const invernaderosBuscados = response.filter(item =>
            item.invernadero.nombre.toLowerCase().includes(this.nombreBusqueda.toLowerCase())
          );
          
          // Si se encuentran invernaderos que coinciden, mostrarlos
          if (invernaderosBuscados.length > 0) {
            this.mostrarInv = invernaderosBuscados.map(item => ({
              Nombre: item.invernadero.nombre,
              Imagen: item.invernadero.imagen
            }));
          } else {
            // Si no se encuentra, mostrar un arreglo vacío (sin resultados)
            this.mostrarInv = [];
          }
        },
        (error) => {
          console.error('Error al buscar invernaderos:', error);
        }
      );
    } else {
      // Si el campo de búsqueda está vacío, no mostrar resultados
      this.mostrarInv = [];
    }
  }
  
  
  
  
    
}
