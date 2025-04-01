import { TestBed } from '@angular/core/testing';

import { AutentficacionService } from '../autentficacion.service';

describe('AutentficacionService', () => {
  let service: AutentficacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutentficacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
