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

// Interfaces
interface MostrarInvernadero {
  nombre: string;
  imagen: string;
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
  imports: [InvernaderosCardComponent, CommonModule, ReactiveFormsModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './tablero-principal.component.html',
  styleUrls: ['./tablero-principal.component.css']
})
export class TableroPrincipalComponent implements OnInit {
  mostrarModal = false;
  form!: FormGroup;
  usuarios: Usuario[] = [];
  sensores: Sensor[] = [];
  invernaderos: MostrarInvernadero[] = [];
  busquedaNombre: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private crearInvernaderoService: InvernaderoService, private tableroPincipalService: TableroprincipalService) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarUsuarios();
    this.cargarSensores();
    this.cargarInvernaderos();
  }

  inicializarFormulario(): void {
    this.form = this.fb.group({
      Nombre: ['', Validators.required],
      NombrePlanta: ['', Validators.required],
      TipoPlanta: ['', Validators.required],
      MinTemperatura: [null, Validators.required],
      MaxTemperatura: [null, Validators.required],
      MinHumedad: [null, Validators.required],
      MaxHumedad: [null, Validators.required],
      usuariosIds: new FormControl([], Validators.required), // Usamos FormControl explícito
      sensoresIds: new FormControl([], Validators.required)   // Usamos FormControl explícito
    });
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

  cargarUsuarios(): void {
    this.crearInvernaderoService.mostrarUsuarios().subscribe({
      next: (data: Usuario[]) => {
        console.log('Usuarios cargados:', data);
        this.usuarios = data;
      },
      error: (err) => {
        console.error('Error al cargar los usuarios:', err);
      }
    });
  }

  cargarSensores(): void {
    this.crearInvernaderoService.mostrarSensores().subscribe({
      next: (data: Sensor[]) => {
        console.log('Sensores cargados:', data);
        this.sensores = data;
      },
      error: (err) => {
        console.error('Error al cargar los sensores:', err);
      }
    });
  }

  toggleSeleccion(tipo: 'usuario' | 'sensor', id: string): void {
    const control = this.form.get(`${tipo}sIds`) as FormControl;
    if (!control) return;
  
    // Asegúrate de que el valor sea un arreglo
    const valores = (control.value as string[]) || [];
    const index = valores.indexOf(id);
  
    if (index > -1) {
      // Si el ID ya está en el array, lo eliminamos
      valores.splice(index, 1);
    } else {
      // Si el ID no está en el array, lo agregamos
      valores.push(id);
    }
  
    // Actualizamos el valor del formulario con el nuevo array de IDs
    control.setValue([...valores]);
  }

  guardarInvernadero(): void {
    if (this.form.valid) {
      const {
        Nombre,
        NombrePlanta,
        TipoPlanta,
        MinTemperatura,
        MaxTemperatura,
        MinHumedad,
        MaxHumedad,
        usuariosIds,
        sensoresIds
      } = this.form.value;
  
      this.crearInvernaderoService.registrarInvernadero(
        Nombre,
        NombrePlanta,
        TipoPlanta,
        MinTemperatura,
        MaxTemperatura,
        MinHumedad,
        MaxHumedad,
        usuariosIds,
        sensoresIds
      ).subscribe({
        next: () => {
          alert('Invernadero registrado exitosamente.');
          this.cerrarModal();
        },
        error: (error) => {
          console.error('Error al registrar el invernadero:', error);
          alert(error.error?.mensaje || 'Hubo un problema al registrar el invernadero.');
        }
      });
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  }
  

  abrirModal(): void {
    this.form.reset();
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }
}
