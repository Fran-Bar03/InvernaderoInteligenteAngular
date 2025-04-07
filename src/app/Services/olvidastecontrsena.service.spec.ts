import { TestBed } from '@angular/core/testing';

import { OlvidasteContrsenaService } from './olvidastecontrsena.service';

describe('OlvidastecontrsenaService', () => {
  let service: OlvidasteContrsenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OlvidasteContrsenaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
