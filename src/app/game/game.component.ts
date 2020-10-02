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
  private readonly initSubject = new ReplaySubject<null>(1);
  public loading: boolean;

  public constructor(
    public readonly gameData: GameDataService,
    private readonly timeDisabledService: TimeDisabledService,
    private readonly serverBus: ServerBusService
  ) {
    Auth.currentAuthenticatedUser().then((user) => {
      const userId = user.attributes.sub;
      this.serverBus
        .connect()
        .pipe(
          tap((result) => {
            if (result.type === 'answers') {
              Object.assign(
                this.gameData.answers,
                mergeOptions(this.gameData.answers, result.answers)
              );

              this.initSubject.next(null);
              this.loading = false;
            } else {
              // tslint:disable-next-line:no-console
              console.log('result', result);
            }
          })
        )
        .subscribe();
      this.serverBus.send({ action: 'init', userId });
      timer(0, 5000)
        .pipe(
          untilDestroyed(this),
          switchMap(() => this.initSubject),
          tap(() => {
            const localStorageKey = userId + '-answers';
            const answers = copy(this.gameData.answers);

            [
              'firstPresidency',
              'apostles',
              'presidencySeventy',
              'presidingBishopric',
              'reliefSociety',
              'youngWomen',
              'youngMen',
              'primary',
              'sundaySchool',
            ].map((category) =>
              Object.values(answers[category]).map((name: PersonData) => {
                delete name.src;
                delete name.name;
              })
            );

            const answersString = JSON.stringify(answers);
            const cachedAnswersString = localStorage.getItem(localStorageKey);
            if (cachedAnswersString !== answersString) {
              localStorage.setItem(localStorageKey, answersString);
              if (!timeDisabledService.isDisabled()) {
                this.serverBus.send({ action: 'answer', answers, userId });
              }
            }
          })
        )
        .subscribe();
    });
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.serverBus.disconnect();
  }
}
