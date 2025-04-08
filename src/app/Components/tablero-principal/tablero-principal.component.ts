import { Component, OnInit } from '@angular/core';
import { InvernaderosCardComponent } from "../invernaderos-card/invernaderos-card.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TableroprincipalService } from '../../Services/tableroprincipal.service';
import { InvernaderoService } from '../../Services/invernadero.service';
import { MatSelectModule } from '@angular/material/select'; 
import { MatOptionModule } from '@angular/material/core'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

// Interfaces
interface MostrarInvernadero {
  nombre: string;
  imagen: string;
}

interface BuscarInvernadero {
  nombre: string;
}

interface Usuario {
  _id: string;
  NombreCompleto: string;
}

interface Sensor {
  _id: string;
  Tipo: string;
}

interface CrearInvernadero {
  Nombre: string;
  NombrePlanta: string;
  TipoPlanta: string;
  MinTemperatura: number;
  MaxTemperatura: number;
  MinHumedad: number;
  MaxHumedad: number;
  usuariosIds: string[];
  sensoresIds: string[];
}

@Component({
  selector: 'app-tablero-principal',
  standalone: true,
  imports: [InvernaderosCardComponent, CommonModule, ReactiveFormsModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatInputModule, FormsModule,],
  templateUrl: './tablero-principal.component.html',
  styleUrls: ['./tablero-principal.component.css']
})
export class TableroPrincipalComponent implements OnInit {
  mostrarModal = false;
  form!: FormGroup;
  usuarios: Usuario[] = [];
  sensores: Sensor[] = [];
  invernaderos: MostrarInvernadero[] = [];
  buscarInvernadero: BuscarInvernadero[] = [];
  busquedaNombre: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private crearInvernaderoService: InvernaderoService, private tableroPincipalService: TableroprincipalService, private router : Router) {}

  ngOnInit(): void {
    this.cargarInvernaderos();
  }

  buscarInvernaderos(): void {
    if (this.busquedaNombre.trim() === '') {
      this.cargarInvernaderos(); // Si no hay búsqueda, muestra todos los invernaderos
    } else {
      this.tableroPincipalService.buscarInvernaderos(this.busquedaNombre).subscribe({
        next: (data: BuscarInvernadero[]) => {
          this.buscarInvernadero = data;
        },
        error: (err) => {
          console.error('Error al buscar los invernaderos:', err);
        }
      });
    }
  }

  get invernaderosFiltrados(): MostrarInvernadero[] {
    if (!this.busquedaNombre) return this.invernaderos;
  
    const texto = this.busquedaNombre.toLowerCase();
    return this.invernaderos.filter(invernadero =>
      invernadero.nombre.toLowerCase().includes(texto)
    );
  }

  cargarInvernaderos(): void {
    this.tableroPincipalService.getInvernaderos().subscribe({
      next: (data: MostrarInvernadero[]) => {
        this.invernaderos = data;
      },
      error: (err) => {
        console.error('Error al cargar los invernaderos:', err);
      }
    });
  }
  
  IrAgregarInv(): void {
    this.router.navigate(['/agregar-invernadero']);
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }
}
