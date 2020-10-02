import { Component, NgZone } from '@angular/core';
import { Auth, Hub } from 'aws-amplify';
import { Router } from '@angular/router';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public loading: boolean;
  public user;

  public constructor(
    private readonly router: Router,
    private readonly ngZone: NgZone
  ) {
    this.loading = true;

    // Used for listening to login events
    Hub.listen('auth', ({ payload: { event, data } }) => {
      console.log(event);
      if (event === 'cognitoHostedUI' || event === 'signedIn') {
        this.ngZone.run(() => {
          this.router.navigate(['/game']);
          this.loading = false;
        });
      }
    });

    // currentAuthenticatedUser: when user comes to login page again
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log('user', user);
        this.user = user;
        return this.ngZone.run(() => {
          return this.router.navigate(['/game'], { replaceUrl: true });
        });
      })
      .catch((err) => {
        console.log(err);
        console.log('Go home', location.href);
        return this.router.navigate(['/home'], { replaceUrl: true });
      })
      .then(() => (this.loading = false));
  }

  public signOutDialog(): void {
    if (window.confirm('Do you want to log out?')) {
      this.loading = true;
      Auth.signOut({ global: true })
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
        .then(() => location.reload());
    }
  }
}
