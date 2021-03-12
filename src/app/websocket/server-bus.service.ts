import { Injectable, OnDestroy } from '@angular/core';
import { WebSocketSubject } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { UserHolderService } from './user-holder.service';
import { env } from '../../environments/environment.getter';

@Injectable({
  providedIn: 'root',
})
export class ServerBusService implements OnDestroy {
  private readonly serverAddress = env().webSocketUrl;
  public connection$: WebSocketSubject<any>;
  private userId;

  public constructor(private readonly userHolder: UserHolderService) {}

  private getConnection(): WebSocketSubject<any> {
    if (!this.connection$) {
      this.connection$ = webSocket(
        this.serverAddress + '?userId=' + this.userId
      );
    }
    return this.connection$;
  }

  public connect(userId): Observable<any> {
    this.userId = userId;
    return this.getConnection();
  }

  public send(data: any): void {
    this.getConnection().next(data);
  }

  public ngOnDestroy(): void {
    this.disconnect();
  }

  public disconnect(): void {
    this.connection$?.complete();
    this.connection$ = null;
  }
}
