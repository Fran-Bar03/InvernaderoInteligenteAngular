import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarCodigoComponent } from './recuperar-codigo.component';

describe('RecuperarCodigoComponent', () => {
  let component: RecuperarCodigoComponent;
  let fixture: ComponentFixture<RecuperarCodigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperarCodigoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
