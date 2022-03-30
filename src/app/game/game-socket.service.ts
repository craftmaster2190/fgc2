import {Injectable} from '@angular/core';
import {first, switchMap, tap} from 'rxjs/operators';
import mergeOptions from 'merge-options';
import {concat, ReplaySubject, timer} from 'rxjs';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {copy} from 'copy-anything';
import {GameDataService, PersonData} from './game-data.service';
import {TimeDisabledService} from '../countdown/time-disabled.service';
import {ServerBusService} from '../websocket/server-bus.service';
import {UserHolderService} from '../websocket/user-holder.service';
import {Optional} from '../util/optional';
import {HttpClient} from '@angular/common/http';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class GameSocket {
  private readonly initSubject = new ReplaySubject<null>(1);

  private loading?: boolean;

  public constructor(
    private readonly gameData: GameDataService,
    private readonly timeDisabledService: TimeDisabledService,
    private readonly serverBus: ServerBusService,
    private readonly userHolder: UserHolderService,
    private readonly httpClient: HttpClient
  ) {
    serverBus.onReconnect().subscribe(() => this.initInitMessage());
    this.initUserAnswersFromLocalStorage();
    this.initListenForUpdates();
    this.initInitMessage();
    this.initBackupAnswersToLocalStorage();
    this.initHeartbeat();
  }

  public isLoading(): boolean {
    return !!this.loading;
  }

  private initHeartbeat(): void {
    timer(0, 20000)
      .pipe(
        untilDestroyed(this),
        switchMap(() => this.initSubject),
        tap(() => {
          this.serverBus.send({action: 'heartbeat'});
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
              this.serverBus.send({action: 'answer', answers, userId});
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
      .then((userId) => this.serverBus.send({action: 'init', userId}));
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
              tap((update) => {
                if (update.type === 'answers') {
                  Object.assign(
                    this.gameData.answers,
                    mergeOptions(this.gameData.answers, update.answers)
                  );

                  this.initSubject.next(null);
                  this.loading = false;
                } else if (update.type === 'scores') {
                  this.gameData.scores = update.scores;
                } else if (update.type === 'corrects') {
                  this.gameData.corrects = this.applyCorrects(update.corrects);
                } else {
                  // tslint:disable-next-line:no-console
                  console.log('Unhandled update', update);
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

  private applyCorrects(corrects: Array<any>): any {
    // {
    //     "type": "corrects",
    //     "corrects": [
    //         {
    //             "temple": "Utah",
    //             "timestamp": 1617328117
    //         },
    //         {
    //             "tieColor": "yellow",
    //             "sessionName": "SaturdayEveningSession",
    //             "speaker": "russellMNelson",
    //             "timestamp": 1617328096
    //         },
    //         {
    //             "song": "High on the Mountain Top",
    //             "choirColor": "purple",
    //             "sessionName": "SaturdayEveningSession",
    //             "timestamp": 1617328109
    //         }
    //     ]
    // }
    return corrects.reduce((obj, correctValue) => {
      if (
        correctValue.speaker &&
        correctValue.sessionName &&
        correctValue.tieColor
      ) {
        obj[correctValue.speaker] = obj[correctValue.speaker] ?? {};
        obj[correctValue.speaker].sessionName =
          obj[correctValue.speaker].sessionName ?? new Set<string>();
        obj[correctValue.speaker].sessionName.add(correctValue.sessionName);
        obj[correctValue.speaker].tieColor =
          obj[correctValue.speaker].tieColor ?? new Set<string>();
        obj[correctValue.speaker].tieColor.add(correctValue.tieColor);
      } else if (
        correctValue.choirColor &&
        correctValue.sessionName &&
        correctValue.song
      ) {
        obj.choir = obj.choir ?? {};
        obj.choir[correctValue.sessionName] =
          obj.choir[correctValue.sessionName] ?? {};
        obj.choir[correctValue.sessionName].choirColor =
          obj.choir[correctValue.sessionName].choirColor ?? new Set<string>();
        obj.choir[correctValue.sessionName].choirColor.add(
          correctValue.choirColor
        );
        obj.songs = obj.songs ?? new Set<string>();
        obj.songs.add(correctValue.song);
      } else if (correctValue.temple) {
        obj.temple = obj.temple ?? new Set<string>();
        obj.temple.add(correctValue.temple);
      }
      return obj;
    }, {});
  }
}
