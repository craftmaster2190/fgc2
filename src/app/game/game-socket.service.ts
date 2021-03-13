import { Injectable } from '@angular/core';
import { first, map, switchMap, tap } from 'rxjs/operators';
import mergeOptions from 'merge-options';
import { concat, ReplaySubject, timer } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { copy } from 'copy-anything';
import { GameDataService, PersonData } from './game-data.service';
import { TimeDisabledService } from '../countdown/time-disabled.service';
import { ServerBusService } from '../websocket/server-bus.service';
import { UserHolderService } from '../websocket/user-holder.service';
import { Optional } from '../util/optional';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

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
    private readonly userHolder: UserHolderService,
    private readonly httpClient: HttpClient
  ) {
    this.initUserAnswersFromLocalStorage();
    this.initListenForUpdates();
    this.initInitMessage();
    this.initBackupAnswersToLocalStorage();
    this.initHeartbeat();
    this.initPageRefresh();
  }

  private initHeartbeat(): void {
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

  private initBackupAnswersToLocalStorage(): void {
    concat(timer(0, 1000))
      .pipe(
        switchMap(() => this.initSubject),
        switchMap(() => this.userHolder.watchUserId()),
        tap((userId) => {
          const localStorageKey = userId + '-answers';
          const answers = copy(this.gameData.answers);

          ['firstPresidency', 'apostles'].map((category) =>
            Object.values(answers[category]).map((name: PersonData) => {
              delete name.src;
              delete name.name;
            })
          );

          [
            'presidencySeventy',
            'presidingBishopric',
            'reliefSociety',
            'youngWomen',
            'youngMen',
            'primary',
            'sundaySchool',
          ].map((category) => {
            delete answers[category];
          });

          const answersString = JSON.stringify(answers);
          const cachedAnswersString = localStorage.getItem(localStorageKey);
          if (cachedAnswersString !== answersString) {
            localStorage.setItem(localStorageKey, answersString);
            if (!this.timeDisabledService.isDisabled()) {
              this.serverBus.send({ action: 'answer', answers, userId });
            }
          }
        })
      )
      .subscribe();
  }

  private initInitMessage(): void {
    this.userHolder
      .watchUserId()
      .pipe(first())
      .toPromise()
      .then((userId) => this.serverBus.send({ action: 'init', userId }));
  }

  private initListenForUpdates(): void {
    this.userHolder
      .watchUserId()
      .pipe(
        first(),
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
                } else if (result.type === 'scores') {
                  this.gameData.scores = result.scores;
                } else if (result.type === 'corrects') {
                  this.gameData.corrects = result.corrects;
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
  }

  private initUserAnswersFromLocalStorage(): void {
    this.userHolder
      .watchUserId()
      .pipe(
        first(),
        tap((userId) => {
          const localStorageKey = userId + '-answers';
          Optional.of(localStorage.getItem(localStorageKey))
            .map((value) => JSON.parse(value))
            .map((value) => mergeOptions(this.gameData.answers, value));
        })
      )
      .subscribe();
  }

  private initPageRefresh(): void {
    const pageStarted = moment();
    const currentUpdateTime = document.head
      .querySelector('meta[property="og:updated_time"]')
      ?.getAttribute('content');

    timer(60000, 60000)
      .pipe(
        switchMap(() =>
          this.httpClient.get('index.html', { responseType: 'text' })
        ),
        map(
          (body) =>
            body.match(/<meta content="(.+)" property="og:updated_time">/)?.[1]
        ),
        tap((newUpdateTime) => {
          if (newUpdateTime !== currentUpdateTime) {
            (window as any).sendSentryData(
              'Restarting after ' +
                moment.duration(moment().diff(pageStarted)).asMilliseconds() +
                'ms (Page loaded at: ' +
                pageStarted.format() +
                ') [' +
                newUpdateTime +
                ' !== ' +
                currentUpdateTime +
                ']'
            );
            // location.reload();
          }
        })
      )
      .subscribe();
  }
}