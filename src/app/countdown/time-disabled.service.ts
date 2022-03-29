import {Injectable} from '@angular/core';
import {NowService} from './now.service';
import {Session, Sessions} from '../data/session';
import * as moment from 'moment';
import {compareFor} from '../../util/comparator';

@Injectable({
  providedIn: 'root',
})
export class TimeDisabledService {
  public readonly sessionDuration = moment.duration(2, 'hours');

  // As of March 2021, all conferences happen in MDT -06:00
  public readonly sessionStarts = {
    [Session.SaturdayMorningSession]: moment.utc(
      '2022-04-02 10:00:00.000-06:00'
    ),
    [Session.SaturdayAfternoonSession]: moment.utc(
      '2022-04-02 14:00:00.000-06:00'
    ),
    [Session.SaturdayEveningSession]: moment.utc(
      '2022-04-02 18:00:00.000-06:00'
    ),
    [Session.SundayMorningSession]: moment.utc(
      '2022-04-03 10:00:00.000-06:00'),
    [Session.SundayAfternoonSession]: moment.utc(
      '2022-04-03 14:00:00.000-06:00'
    ),
  };

  public constructor(private readonly nowService: NowService) {
  }

  public getCurrentSession(now = this.nowService.now()): Session {
    return Sessions.find(
      (session) =>
        now.isSameOrAfter(this.getMomentForSession(session)) &&
        now.isSameOrBefore(
          this.getMomentForSession(session).add(this.sessionDuration)
        )
    );
  }

  public getNextSession(now = this.nowService.now()): Session {
    return Sessions.filter((session) =>
      now.isBefore(this.getMomentForSession(session))
    ).sort(
      compareFor((session) => this.getMomentForSession(session).unix())
    )[0];
  }

  public isDisabled(): boolean {
    const currentSession = this.getCurrentSession();
    return !!currentSession;
  }

  public timeUntilNext(): moment.Duration {
    const now = this.nowService.now();
    const currentSession = this.getCurrentSession(now);

    // During session
    if (currentSession) {
      const endOfCurrentSession = this.getMomentForSession(currentSession).add(
        this.sessionDuration
      );
      return moment.duration(endOfCurrentSession.diff(now));
    }

    const nextSession = this.getNextSession(now);

    // After all sessions
    if (!nextSession) {
      return null;
    }

    // Between sessions
    return moment.duration(this.getMomentForSession(nextSession).diff(now));
  }

  private getMomentForSession(session: Session): moment.Moment {
    return this.sessionStarts[session].clone();
  }
}
