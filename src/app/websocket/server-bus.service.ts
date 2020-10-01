import { Injectable, OnDestroy } from '@angular/core';
import { WebSocketSubject } from 'rxjs/internal-compatibility';
import { Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class ServerBusService implements OnDestroy {
  private readonly serverAddress =
    'wss://oyz7jg88i9.execute-api.us-east-1.amazonaws.com/production';
  public connection$: WebSocketSubject<any>;

  public constructor() {}

  private getConnection(): WebSocketSubject<any> {
    if (this.connection$) {
      return this.connection$;
    } else {
      this.connection$ = webSocket(this.serverAddress);
      return this.connection$;
    }
  }

  public connect(): Observable<any> {
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
