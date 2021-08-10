import { TestBed } from '@angular/core/testing';

import { SwitchStatesService } from './switch-states.service';

describe('SwitchStatesService', () => {
  let service: SwitchStatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchStatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
