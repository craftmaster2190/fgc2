import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameDataService, PersonData } from './game-data.service';
import { Sessions } from '../data/session';
import { capitalCase } from 'change-case';
import { ServerBusService } from '../websocket/server-bus.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, tap } from 'rxjs/operators';
import { ReplaySubject, timer } from 'rxjs';
import { copy } from 'copy-anything';
import { TimeDisabledService } from '../countdown/time-disabled.service';
import mergeOptions from 'merge-options';
import { Auth } from 'aws-amplify';
import { GameSocket } from './game-socket.ts.service';
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
    public readonly gameData: GameDataService,
    public readonly gameSocket: GameSocket,
    public readonly userHolder: UserHolderService
  ) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {}
}
