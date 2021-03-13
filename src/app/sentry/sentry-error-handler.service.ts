import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import * as Sentry from '@sentry/browser';
import { UserHolderService } from '../websocket/user-holder.service';

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  public constructor(
    userHolderService: UserHolderService,
    private readonly ngZone: NgZone
  ) {
    userHolderService
      .watchUser()
      .subscribe((user) => this.updateSentryInfo(user));
  }

  public updateSentryInfo(user: any): void {
    if ((window as any).sentryIsRunning) {
      try {
        const sentryUser = !user
          ? null
          : { username: user.username, sub: user.attributes.sub };
        Sentry.setUser(sentryUser);
      } catch (unexpectedError) {
        (window as any).sendSentryData(unexpectedError);
      }
    }
  }

  public handleError(error): void {
    this.ngZone.runOutsideAngular(() => (window as any).sendSentryData(error));
  }
}
