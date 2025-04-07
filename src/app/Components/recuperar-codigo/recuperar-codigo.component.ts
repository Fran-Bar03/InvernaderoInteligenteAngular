import { Component, ViewChildren, QueryList, ElementRef,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RecuperarCodigoService, ValidarCodigoDTO } from '../../Services/recuperar-codigo.service';
import { RecoverypasswordService } from '../../Services/recoverypassword.service';

@Component({
  selector: 'app-recuperar-codigo',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './recuperar-codigo.component.html',
  styleUrl: './recuperar-codigo.component.css'
})


export class RecuperarCodigoComponent implements OnInit {
  @ViewChildren('codigoInput') codigoInputs!: QueryList<ElementRef>;
  Email : string = '';
  Codigo : string = '';
  token : string = '';
  errorMessage : string = '';
  loading : boolean = false;
  mensajeError : string = '';
  mensajeExito : string = '';


  codigoRecuperacion: string[] = ['', '', '', '', '', ''];


  constructor (
    private CodigoService : RecuperarCodigoService,
    private recoveryService : RecoverypasswordService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }


  cargarDatosIniciales(): void {
    // Cargar email y token desde el servicio
    this.token = this.recoveryService.ObtenerRecoveyToken()?? ''; 
    if (this.token) {
      this.Email = this.recoveryService.ObtenerEmailToken(this.token) ?? ''; // Obtener email desde el token
    }
  }


  // Método para juntar todos los campos del código
  juntarCodigo(): string {
    return this.codigoRecuperacion.join('');
  }



  validarCodigo(): void {
    const codigoCompleto = this.juntarCodigo();  // Unir los campos del código
  
    console.log('Código:', codigoCompleto);  // Verifica que el código concatenado sea correcto.
  
    if (!codigoCompleto || !this.token || !this.Email) {
      this.mensajeError = "Por favor ingrese el código correctamente.";
      return;
    }
  
    this.loading = true;
    this.CodigoService.ValidarCodigo(this.Email, codigoCompleto).subscribe(
      response => {
        this.loading = false;
        this.mensajeExito = 'Código validado con éxito, redirigiendo...';
  
        // Almacenar email y token antes de redirigir a la siguiente pantalla
        this.recoveryService.GuardarRecoveryToken(response);
  
        // Redirigir a la siguiente pantalla
        this.router.navigate(['/recuperar-contrasena']);
      },
      error => {
        this.loading = false;
        this.mensajeError = 'Código inválido. Intenta nuevamente.';
        console.error(error);  // Imprime el error para ver qué responde la API
      }
    );
  }
  

  reenviarCodigo(): void {
    if (!this.Email) {
      this.mensajeError = "No se encontró el email. Intenta nuevamente.";
      return;
    }

    this.loading = true;
    this.CodigoService.reenviarCodigo(this.Email).subscribe(
      (newToken: string) => {
        this.loading = false;
        this.mensajeExito = 'Nuevo código enviado con éxito. Revisa tu correo.';

        // Guardar el nuevo token recibido
        this.recoveryService.GuardarRecoveryToken(newToken);
      },
      error => {
        this.loading = false;
        this.mensajeError = 'Error al reenviar el código. Intenta de nuevo.';
      }
    );
  }


  ngAfterViewInit() {
    setTimeout(() => {
      if (this.codigoInputs?.first) {
        this.codigoInputs.first.nativeElement.focus();
      }
    });
  }

  handleInput(event: Event, index: number) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (value.length > 1) {
      target.value = value.slice(0, 1);
    }
    
    // No duplicar valores
    if (value !== this.codigoRecuperacion[index]) {
      this.codigoRecuperacion[index] = value;
    }

    // Mover al siguiente campo si es necesario
    if (value && index < this.codigoRecuperacion.length - 1) {
      this.codigoInputs.toArray()[index + 1]?.nativeElement.focus();
    }
  }

  handleBackspace(event: KeyboardEvent, index: number) {
    const target = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && !target.value && index > 0) {
      this.codigoInputs.toArray()[index - 1]?.nativeElement.focus();
    }
  }

}
