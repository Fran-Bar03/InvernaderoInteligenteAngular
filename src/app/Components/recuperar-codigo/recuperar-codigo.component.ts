import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recuperar-codigo',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './recuperar-codigo.component.html',
  styleUrl: './recuperar-codigo.component.css'
})
export class RecuperarCodigoComponent {
  codigoForm: FormGroup;
  
// Array para manejar los códigos
codigoRecuperacion: string[] = new Array(6).fill("");

// Referencia a los inputs del código
@ViewChildren('codigo-input') codigoInputs!: QueryList<ElementRef>;

  constructor(private fb: FormBuilder) {
    this.codigoForm = this.fb.group({
      nuevacontrasena: ['', [Validators.required, Validators.minLength(8)]],
      confirmarcontrasena: ['', [Validators.required]]
    });
  }
  cambiarContrasena() {
    if (this.codigoForm.valid) {
      const { nuevaContrasena, confirmarContrasena } = this.codigoForm.value;

      if (nuevaContrasena !== confirmarContrasena) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      console.log("Código ingresado:", this.codigoForm.value.codigo);
      console.log("Nueva contraseña:", nuevaContrasena);
      alert("Contraseña cambiada exitosamente.");
    }
  }

  // Enfocar el primer input después de renderizar la vista
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.codigoInputs && this.codigoInputs.first) {
        this.codigoInputs.first.nativeElement.focus();
      }
    }, 0);
  }

  // Lógica para cambiar el focus de los inputs cuando se inserte un dígito
  handleInput(event: any, index: number) {
    const target = event.target as HTMLInputElement | null;

    // Si se ha ingresado un valor y no es el último input, enfocar el siguiente
    if (target && target.value && index < this.codigoRecuperacion.length - 1) {
      this.codigoInputs.toArray()[index + 1]?.nativeElement.focus();
    }
  }

  // Lógica para mover el foco al input anterior si se borra un valor
  handleBackspace(event: KeyboardEvent, index: number) {
    const target = event.target as HTMLInputElement | null;

    if (target && event.key === 'Backspace' && index > 0 && !target.value) {
      this.codigoInputs.toArray()[index - 1]?.nativeElement.focus();
    }
  }
}
