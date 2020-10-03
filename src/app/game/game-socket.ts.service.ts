import { Injectable } from '@angular/core';
import { first, switchMap, tap } from 'rxjs/operators';
import mergeOptions from 'merge-options';
import { ReplaySubject, timer } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { copy } from 'copy-anything';
import { GameDataService, PersonData } from './game-data.service';
import { TimeDisabledService } from '../countdown/time-disabled.service';
import { ServerBusService } from '../websocket/server-bus.service';
import { UserHolderService } from '../websocket/user-holder.service';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class GameSocket {
  private readonly initSubject = new ReplaySubject<null>(1);

  private loading?: boolean;

  public isLoading(): boolean {
    return !!this.loading;
  }

  public constructor(
    private readonly gameData: GameDataService,
    private readonly timeDisabledService: TimeDisabledService,
    private readonly serverBus: ServerBusService,
    private readonly userHolder: UserHolderService
  ) {
    this.userHolder
      .getUserId()
      .pipe(
        tap((userId) =>
          this.serverBus
            .connect(userId)
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
            .subscribe()
        )
      )
      .subscribe();
    userHolder
      .getUserId()
      .toPromise()
      .then((userId) => this.serverBus.send({ action: 'init', userId }));
    timer(0, 5000)
      .pipe(
        untilDestroyed(this),
        switchMap(() => this.initSubject),
        switchMap(() => userHolder.getUserId()),
        tap((userId) => {
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

    timer(0, 20000)
      .pipe(
        untilDestroyed(this),
        switchMap(() => this.initSubject),
        tap(() => {
          this.serverBus.send({ action: 'heartbeat' });
        })
      )
      .subscribe();
  }
}
