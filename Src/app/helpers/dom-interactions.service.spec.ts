import { TestBed } from '@angular/core/testing';

import { DomInteractionsService } from './dom-interactions.service';

describe('DomInteractionsService', () => {
  let service: DomInteractionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomInteractionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
