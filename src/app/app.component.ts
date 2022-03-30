import {Component, NgZone} from '@angular/core';
import {Auth, Hub} from 'aws-amplify';
import {Router} from '@angular/router';
import {UserHolderService} from './websocket/user-holder.service';
import * as moment from 'moment';
import {timer} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public loading: boolean;
  private readonly pageStartTime = moment();

  public constructor(
    private readonly router: Router,
    private readonly ngZone: NgZone,
    private readonly userHolder: UserHolderService,
    private readonly httpClient: HttpClient
  ) {
    this.loading = true;
    this.initPageRefresh();

    // Used for listening to login events
    Hub.listen('auth', ({payload: {event, data}}) => {
      console.log('Hub Auth Event', event);
      if (event === 'cognitoHostedUI' || event === 'signedIn') {
        this.ngZone.run(() => {
          console.log('Hub Auth: Send to game');
          this.router
            .navigate(['/game'])
            .catch((err) => console.log('Hub Auth Error', err))
            .then(() => (this.loading = false));
        });
      }
    });

    // currentAuthenticatedUser: when user comes to login page again
    Auth.currentAuthenticatedUser()
      .then((user) => {
        this.userHolder.setUser(user);
        return this.ngZone.run(() => {
          console.log('Current User: Send to game');
          return this.router.navigate(['/game'], {replaceUrl: true});
        });
      })
      .catch((err) => {
        console.log('Current User:', err);
        return this.ngZone.run(() => {
          console.log('Current User: Send to home');
          return this.router.navigate(['/home'], {replaceUrl: true});
        });
      })
      .then(() => (this.loading = false));
  }

  public signOutDialog(): void {
    if (window.confirm('Do you want to log out?')) {
      this.loading = true;
      Auth.signOut({global: true})
        .then((data) => console.log('SignOut:', data))
        .catch((err) => console.log('SignOut:', err))
        .then(() => location.reload());
    }
  }


  private initPageRefresh(): void {
    const getUpdateTime = (node) => {
      return node
        .querySelector('meta[property="og:updated_time"]')
        ?.getAttribute('content');
    };

    const pageStarted = moment();
    const currentUpdateTime = getUpdateTime(document.head);

    timer(60000, 60000)
      .pipe(
        switchMap(() =>
          this.httpClient.get('index.html', {responseType: 'text'})
        ),
        map((body) =>
          getUpdateTime(new DOMParser().parseFromString(body, 'text/html'))
        ),
        tap((newUpdateTime) => {
          console.log('Page awake for', moment.duration(this.pageStartTime.diff(moment())).humanize());
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
            location.reload();
          }
        })
      )
      .subscribe();
  }
}
