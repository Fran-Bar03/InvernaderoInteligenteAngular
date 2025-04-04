import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoLayoutComponent } from './contenido-layout.component';

describe('ContenidoLayoutComponent', () => {
  let component: ContenidoLayoutComponent;
  let fixture: ComponentFixture<ContenidoLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenidoLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
