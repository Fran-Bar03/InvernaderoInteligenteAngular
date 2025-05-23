import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCodigoComponent } from './modal-codigo.component';

describe('ModalCodigoComponent', () => {
  let component: ModalCodigoComponent;
  let fixture: ComponentFixture<ModalCodigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCodigoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
