import { Component, OnInit } from '@angular/core';
import { ServerBusService } from '../websocket/server-bus.service';
import { UserHolderService } from '../websocket/user-holder.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  private loggedIn = false;

  public constructor(
    private readonly userHolder: UserHolderService,
    private readonly serverBus: ServerBusService
  ) {
    this.userHolder
      .watchUser()
      .pipe(
        untilDestroyed(this),
        tap((value) => (this.loggedIn = !!value))
      )
      .subscribe();
  }

  public ngOnInit(): void {}

  public showSpinner(): boolean {
    return this.loggedIn && !this.serverBus.isConnected();
  }
}
