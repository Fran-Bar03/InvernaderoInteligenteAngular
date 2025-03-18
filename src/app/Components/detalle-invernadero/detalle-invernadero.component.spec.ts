import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleInvernaderoComponent } from './detalle-invernadero.component';

describe('DetalleInvernaderoComponent', () => {
  let component: DetalleInvernaderoComponent;
  let fixture: ComponentFixture<DetalleInvernaderoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleInvernaderoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleInvernaderoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
