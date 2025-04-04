import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutentificacionesLayoutComponent } from './autentificaciones-layout.component';

describe('AutentificacionesLayoutComponent', () => {
  let component: AutentificacionesLayoutComponent;
  let fixture: ComponentFixture<AutentificacionesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutentificacionesLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutentificacionesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
