import { TestBed } from '@angular/core/testing';

import { ValveMovementService } from './valve-movement.service';

describe('ValveMovementService', () => {
  let service: ValveMovementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValveMovementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
