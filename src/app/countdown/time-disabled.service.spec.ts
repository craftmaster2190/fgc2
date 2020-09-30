import { TestBed } from '@angular/core/testing';

import { TimeDisabledService } from './time-disabled.service';
import { Session, Sessions } from '../data/session';
import { NowService } from './now.service';
import * as moment from 'moment';

describe('TimeDisabledService', () => {
  let timeDisabledService: TimeDisabledService;
  let nowService: NowService;
  const unixStart = {
    [Session.SaturdayMorningSession]: 1601740800,
    [Session.SaturdayAfternoonSession]: 1601755200,
    [Session.PriesthoodSession]: 1601769600,
    [Session.SundayMorningSession]: 1601827200,
    [Session.SundayAfternoonSession]: 1601841600,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: NowService, useValue: {} }],
    });
    timeDisabledService = TestBed.inject(TimeDisabledService);
    nowService = TestBed.inject(NowService);
  });

  it('should be created', () => {
    expect(timeDisabledService).toBeTruthy();
  });

  it('sessionDuration should be created', () => {
    expect(timeDisabledService.sessionDuration).toBeTruthy();
    expect(timeDisabledService.sessionDuration.asSeconds).toBeTruthy();
    expect(timeDisabledService.sessionDuration.asSeconds()).toBeTruthy();
  });

  it('sessionDuration should be 2 hours', () => {
    expect(timeDisabledService.sessionDuration.asSeconds()).toBe(60 * 60 * 2);
  });

  Sessions.forEach((session) => {
    describe('session ' + session, () => {
      it(
        'session ' + session + ' starts correctly and disables correctly',
        () => {
          const unixStartTime = unixStart[session];
          nowService.now = () => moment.unix(unixStartTime);
          expect(nowService.now().unix()).toBe(unixStartTime);
          expect(timeDisabledService.sessionStarts[session].unix()).toBe(
            unixStartTime
          );
          expect(timeDisabledService.getCurrentSession()).toBe(session);
          expect(timeDisabledService.isDisabled()).toBeTruthy(
            'disabled at start of session'
          );
        }
      );

      it('session ' + session + ' is enabled before start', () => {
        const unixStartTime = unixStart[session];
        nowService.now = () => moment.unix(unixStartTime - 1);
        expect(timeDisabledService.getCurrentSession()).toBeFalsy(
          'should be no current session'
        );
        expect(timeDisabledService.isDisabled()).toBeFalsy(
          'enabled before start of session'
        );
      });

      it('session ' + session + ' is disabled halfway through session', () => {
        const unixStartTime = unixStart[session];
        nowService.now = () => moment.unix(unixStartTime + 60 * 60);
        expect(timeDisabledService.isDisabled()).toBeTruthy(
          'disabled at middle of session'
        );
      });

      it(
        'session ' + session + ' is disabled right before end of session',
        () => {
          const unixStartTime = unixStart[session];
          nowService.now = () =>
            moment.unix(
              unixStartTime +
                timeDisabledService.sessionDuration.asSeconds() -
                1
            );
          expect(timeDisabledService.isDisabled()).toBeTruthy(
            'disabled right before end of session'
          );
        }
      );

      it('session ' + session + ' is disabled for whole session', () => {
        const unixStartTime = unixStart[session];
        nowService.now = () =>
          moment.unix(
            unixStartTime + timeDisabledService.sessionDuration.asSeconds()
          );
        expect(timeDisabledService.isDisabled()).toBeTruthy(
          'disabled at end of session'
        );
      });

      it('session ' + session + ' is enabled after session ends', () => {
        const unixStartTime = unixStart[session];
        nowService.now = () =>
          moment.unix(
            unixStartTime + timeDisabledService.sessionDuration.asSeconds() + 1
          );
        expect(timeDisabledService.isDisabled()).toBeFalsy(
          'enabled after end of session'
        );
      });
    });
  });

  describe('timeUntil tests', () => {
    Sessions.forEach((session) => {
      it('session ' + session + ' timeUntil 1 hour before', () => {
        const unixStartTime = unixStart[session];
        const duration = moment.duration(1, 'hour');
        nowService.now = () => moment.unix(unixStartTime).subtract(duration);
        expect(timeDisabledService.timeUntilNext()?.toISOString()).toBe(
          duration.toISOString()
        );
      });

      it('session ' + session + ' timeUntil 5 minutes before', () => {
        const unixStartTime = unixStart[session];
        const duration = moment.duration(5, 'minute');
        nowService.now = () => moment.unix(unixStartTime).subtract(duration);
        expect(timeDisabledService.timeUntilNext()?.toISOString()).toBe(
          duration.toISOString()
        );
      });

      it('session ' + session + ' timeUntil 5 minutes in', () => {
        const unixStartTime = unixStart[session];
        const duration = moment.duration(5, 'minute');
        nowService.now = () => moment.unix(unixStartTime).add(duration);
        expect(timeDisabledService.timeUntilNext()?.toISOString()).toBe(
          moment.duration(60 + 55, 'minute').toISOString()
        );
      });

      if (
        session !== Session.PriesthoodSession &&
        session !== Session.SundayAfternoonSession
      ) {
        it('session ' + session + ' timeUntil 5 minutes after', () => {
          const unixStartTime = unixStart[session];
          const duration = moment.duration(125, 'minute');
          nowService.now = () => moment.unix(unixStartTime).add(duration);
          expect(timeDisabledService.timeUntilNext()?.toISOString()).toBe(
            moment.duration(60 + 55, 'minute').toISOString()
          );
        });
      }
    });

    it(
      'session ' + Session.PriesthoodSession + ' timeUntil 5 minutes after',
      () => {
        const unixStartTime = unixStart[Session.PriesthoodSession];
        const duration = moment.duration(125, 'minute');
        nowService.now = () => moment.unix(unixStartTime).add(duration);
        expect(timeDisabledService.timeUntilNext()?.toISOString()).toBe(
          moment.duration(13, 'hour').add(55, 'minute').toISOString()
        );
      }
    );

    it(
      'session ' +
        Session.SundayAfternoonSession +
        ' timeUntil 5 minutes after',
      () => {
        const unixStartTime = unixStart[Session.SundayAfternoonSession];
        const duration = moment.duration(125, 'minute');
        nowService.now = () => moment.unix(unixStartTime).add(duration);
        expect(
          timeDisabledService.timeUntilNext()?.toISOString()
        ).toBeUndefined();
      }
    );
  });
});
