import { TestBed } from '@angular/core/testing';

import { ServerBusService } from './server-bus.service';

describe('ServerBusService', () => {
  let service: ServerBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
