import { TestBed } from '@angular/core/testing';

import { RecuperarCodigoService } from './recuperar-codigo.service';

describe('RecuperarCodigoService', () => {
  let service: RecuperarCodigoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecuperarCodigoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
