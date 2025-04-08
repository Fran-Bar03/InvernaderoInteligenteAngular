import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvernaderoService } from 'src/app/Services/invernadero.service';

@Component({
  selector: 'app-agregar-invernadero',
  imports: [],
  templateUrl: './agregar-invernadero.component.html',
  styleUrl: './agregar-invernadero.component.css'
})
export class AgregarInvernaderoComponent: implements OnInit {

constructor(private invernaderoService: InvernaderoService) {}

  invernaderos: any = null;
  nuevoInvernadero
  ngOnInit(): void {
    this.inicializarFormulario();
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
}
