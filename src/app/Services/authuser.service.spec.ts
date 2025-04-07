import { TestBed } from '@angular/core/testing';

import { AuthService } from './authuser.service';

describe('AuthuserService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
