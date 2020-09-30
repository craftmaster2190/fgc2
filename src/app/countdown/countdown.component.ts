import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TimeDisabledService } from './time-disabled.service';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  public timeUntilText;
  public nextText;

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
            this.nextText = 'until end of ' + currentSession;
          } else {
            const nextSession = timeDisabledService.getNextSession();
            if (nextSession) {
              this.nextText = 'until start of ' + nextSession;
            }
          }

          const days = timeUntil.days();
          const hours = timeUntil.hours();
          const minutes = timeUntil.minutes();
          const seconds = timeUntil.seconds();

          this.timeUntilText = '';
          if (days) {
            this.timeUntilText = days + ' Days ';
          }
          this.timeUntilText += hours + ':' + minutes + ':' + seconds;
        })
      )
      .subscribe();
  }

  public ngOnInit(): void {}
}
