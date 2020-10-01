import { Component, OnInit } from '@angular/core';
import { GameDataService } from './game-data.service';
import { Sessions } from '../data/session';
import { capitalCase } from 'change-case';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  public readonly sessions = Sessions;
  public readonly sessionNames = this.sessions.reduce((obj, session) => {
    obj[session] = capitalCase(session);
    return obj;
  }, {});

  public constructor(public readonly gameData: GameDataService) {}

  public ngOnInit(): void {}
}
