import { TestBed } from '@angular/core/testing';

import { TableroprincipalService } from './tableroprincipal.service';

describe('TableroprincipalService', () => {
  let service: TableroprincipalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableroprincipalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
