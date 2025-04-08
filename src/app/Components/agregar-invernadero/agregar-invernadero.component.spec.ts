import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarInvernaderoComponent } from './agregar-invernadero.component';

describe('AgregarInvernaderoComponent', () => {
  let component: AgregarInvernaderoComponent;
  let fixture: ComponentFixture<AgregarInvernaderoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarInvernaderoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarInvernaderoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
