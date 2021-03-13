import { TestBed } from '@angular/core/testing';
import { GameSocket } from './game-socket.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GameSocket', () => {
  let service: GameSocket;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(GameSocket);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
