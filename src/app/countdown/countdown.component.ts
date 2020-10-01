import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TimeDisabledService } from './time-disabled.service';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { capitalCase } from 'change-case';

@UntilDestroy()
@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  public timeUntilText;
  public nextText;

  private padNumber(num: number): string {
    if (num < 10) {
      return '0' + String(num);
    }
    return String(num);
  }

  public constructor(timeDisabledService: TimeDisabledService) {
    timer(0, 1000)
      .pipe(
        untilDestroyed(this),
        tap(() => {
          const timeUntil = timeDisabledService.timeUntilNext();
          if (!timeUntil) {
            this.timeUntilText = null;
            this.nextText = null;
            return;
          }

          const currentSession = timeDisabledService.getCurrentSession();
          if (currentSession) {
            this.nextText = 'until end of ' + capitalCase(currentSession);
          } else {
            const nextSession = timeDisabledService.getNextSession();
            if (nextSession) {
              this.nextText = 'until start of ' + capitalCase(nextSession);
            }
          }

          const hours = timeUntil.hours() + timeUntil.days() * 24;
          const minutes = timeUntil.minutes();
          const seconds = timeUntil.seconds();

          this.timeUntilText =
            this.padNumber(hours) +
            ':' +
            this.padNumber(minutes) +
            ':' +
            this.padNumber(seconds);
        })
      )
      .subscribe();
  }

  public ngOnInit(): void {}
}
