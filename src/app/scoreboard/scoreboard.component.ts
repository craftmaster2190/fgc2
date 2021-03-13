import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GameDataService } from '../game/game-data.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { compareFor } from '../../util/comparator';
import { MatSort } from '@angular/material/sort';

@UntilDestroy()
@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements AfterViewInit {
  public displayedColumns: string[] = ['username', 'score'];
  public datasource = new MatTableDataSource([]);

  public constructor(gameDataService: GameDataService) {
    timer(2000, 10000)
      .pipe(
        untilDestroyed(this),
        tap(() => {
          this.datasource.data = gameDataService.scores
            .slice()
            .sort(compareFor((score) => score.score))
            .reverse();
        })
      )
      .subscribe();
  }

  @ViewChild(MatSort) public sort: MatSort;

  public ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
  }
}
