import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tpoAuthguardGuard } from './tpo-authguard.guard';

describe('tpoAuthguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tpoAuthguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
