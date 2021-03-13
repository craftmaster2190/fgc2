import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameDataService } from './game-data.service';
import { Sessions } from '../data/session';
import { capitalCase } from 'change-case';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TimeDisabledService } from '../countdown/time-disabled.service';
import { GameSocket } from './game-socket.service';
import { UserHolderService } from '../websocket/user-holder.service';

@UntilDestroy()
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  public readonly sessions = Sessions;
  public readonly sessionNames = this.sessions.reduce((obj, session) => {
    obj[session] = capitalCase(session);
    return obj;
  }, {});

  public constructor(
    public readonly timeDisabledService: TimeDisabledService,
    public readonly gameData: GameDataService,
    public readonly gameSocket: GameSocket,
    public readonly userHolder: UserHolderService
  ) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {}
}
