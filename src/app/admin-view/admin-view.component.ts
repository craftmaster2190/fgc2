import { Component, OnInit } from '@angular/core';
import { TimeDisabledService } from '../countdown/time-disabled.service';
import { Session, Sessions } from '../data/session';
import { TieColor, TieColors } from '../data/tie-color';
import { ChoirColor, ChoirColors } from '../data/choir-color';
import { FormControl } from '@angular/forms';
import { apostles, firstPresidency } from '../data/people';
import { camelCase } from 'change-case';
import { Hymns } from '../data/hymns';
import { CountryNames, StateNames } from '../data/countries';
import { GameSocket } from '../game/game-socket.service';
import { Observable } from 'rxjs';
import { first, map, startWith, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { ServerBusService } from '../websocket/server-bus.service';
import { randomElement } from '../../util/arrays';
import { UserHolderService } from '../websocket/user-holder.service';

type AnswerType = 'speaker' | 'song' | 'temple';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
})
export class AdminViewComponent implements OnInit {
  public selectedType = new FormControl();
  public selectedSession: Session = randomElement(Sessions);
  public selectedTieColor: TieColor = randomElement(TieColors);
  public selectedChoirColor: ChoirColor = randomElement(ChoirColors);
  public readonly speakers = [...firstPresidency, ...apostles].map((name) =>
    camelCase(name.replace('.', ''))
  );
  public readonly songs = Hymns;
  public readonly places = [...CountryNames, ...StateNames];
  public selectedSpeaker = new FormControl();
  public selectedSong = new FormControl();
  public selectedStateOrCountry = new FormControl();

  public filteredSpeakers: Observable<string[]>;
  public filteredSongs: Observable<string[]>;
  public filteredStateOrCountries: Observable<string[]>;

  public constructor(
    public readonly timeDisabledService: TimeDisabledService,
    public readonly gameSocket: GameSocket,
    private readonly serverBus: ServerBusService,
    private readonly userHolder: UserHolderService
  ) {
    this.selectedSession =
      timeDisabledService.getCurrentSession() ??
      timeDisabledService.getNextSession();

    gameSocket.isLoading(); // TODO is this needed?
  }

  public ngOnInit(): void {
    this.filteredSpeakers = this.selectedSpeaker.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value, this.speakers))
    );
    this.filteredSongs = this.selectedSong.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value, this.songs))
    );
    this.filteredStateOrCountries = this.selectedStateOrCountry.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value, this.places))
    );
  }

  private filter(value: string, array: string[]): string[] {
    const filterValue = value?.toLowerCase();
    if (!filterValue) {
      return array;
    }
    return array.filter((option) => option.toLowerCase().includes(filterValue));
  }

  public addSpeaker(): void {
    this.userHolder
      .watchUserId()
      .pipe(
        first(),
        tap((userId) => {
          this.serverBus.send({
            action: 'adminanswer',
            answer: {
              timestamp: moment().unix(),
              sessionName: this.selectedSession,
              speaker: this.selectedSpeaker.value,
              tieColor: this.selectedTieColor,
            },
            userId,
          });

          this.selectedSpeaker.reset();
        })
      )
      .subscribe();
  }

  public addSong(): void {
    this.userHolder
      .watchUserId()
      .pipe(
        first(),
        tap((userId) => {
          this.serverBus.send({
            action: 'adminanswer',
            answer: {
              timestamp: moment().unix(),
              sessionName: this.selectedSession,
              choirColor: this.selectedChoirColor,
              song: this.selectedSong.value,
            },
            userId,
          });

          this.selectedSong.reset();
        })
      )
      .subscribe();
  }

  public addTemple(): void {
    this.userHolder
      .watchUserId()
      .pipe(
        first(),
        tap((userId) => {
          this.serverBus.send({
            action: 'adminanswer',
            answer: {
              timestamp: moment().unix(),
              temple: this.selectedStateOrCountry.value,
            },
            userId,
          });

          this.selectedStateOrCountry.reset();
        })
      )
      .subscribe();
  }
}
