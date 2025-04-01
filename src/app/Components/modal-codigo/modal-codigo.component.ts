import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-codigo',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './modal-codigo.component.html',
  styleUrl: './modal-codigo.component.css'
})
export class ModalCodigoComponent {
  @Input() isModalOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit(); 
  }
}
