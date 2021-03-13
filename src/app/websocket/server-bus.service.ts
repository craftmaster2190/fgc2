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
  private connected = false;

  public constructor(private readonly userHolder: UserHolderService) {}

  private getConnection(): WebSocketSubject<any> {
    if (!this.connection$) {
      this.connection$ = webSocket({
        url: this.serverAddress + '?userId=' + this.userId,
        openObserver: {
          next: (value) => {
            console.log('openObserver', value);
            this.connected = true;
          },
        },
        closeObserver: {
          next: (value) => {
            console.log('closeObserver', value);
            this.connected = false;
          },
        },
        closingObserver: {
          next: (value) => {
            console.log('closingObserver', value);
          },
        },
      });
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

  public isConnected(): boolean {
    return this.connected;
  }
}
