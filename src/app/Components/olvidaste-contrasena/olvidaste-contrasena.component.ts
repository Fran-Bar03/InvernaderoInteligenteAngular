import { AfterViewInit, Component, NgModule, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AutentificacionService } from '../../Services/autentificacion.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalCodigoComponent } from "../modal-codigo/modal-codigo.component";


@Component({
  selector: 'app-olvidaste-contrasena',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, ModalCodigoComponent, FormsModule],
  templateUrl: './olvidaste-contrasena.component.html',
  styleUrls: ['./olvidaste-contrasena.component.css'],
})
export class OlvidasteContrasenaComponent implements AfterViewInit {
  forgotPasswordForm: FormGroup;
  message: string = '';

  //Variable para el modal
  modalOpen = false;

  //Array para el código de recuperación
 // Arrays para manejar los códigos
 codigoRecuperacion: string[] = new Array(6).fill("");
  
 // Manejo de inputs
 @ViewChildren('codigoInput') codigoInputs!: QueryList<ElementRef>;

  constructor(private fb: FormBuilder, private autentificacionService: AutentificacionService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
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

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      this.autentificacionService.enviarResetContrasena(email).subscribe(
        (res) => (this.message = 'Revisa tu correo para recuperar tu contraseña.'),
        (err) => (this.message = 'Error al enviar el correo.')
      );
    }
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }
}
