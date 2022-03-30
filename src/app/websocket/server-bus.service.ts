import {Injectable, isDevMode, OnDestroy} from '@angular/core';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {fromEvent, Observable, Subject, Subscription} from 'rxjs';
import {webSocket} from 'rxjs/webSocket';
import {env} from '../../environments/environment.getter';

@Injectable({
  providedIn: 'root',
})
export class ServerBusService implements OnDestroy {
  public connection$: WebSocketSubject<any>;
  private readonly serverAddress = env().webSocketUrl;
  private userId;
  private connected = false;

  private readonly connectionFacade = new Subject<any>();
  private readonly reconnectionNotifier = new Subject<any>();
  private readonly disconnectionNotifier = new Subject<any>();
  private connectionSubscription: Subscription;
  private openSubscription: Subscription;
  private connectionCount = 0;

  public constructor() {
  }

  public connect(userId): Observable<any> {
    this.userId = userId;
    this.connectionSubscription = this.getConnection().subscribe();

    // Fail safe
    fromEvent(window, 'focus').subscribe(() => {
      if (!this.connected) {
        setTimeout(() => {
          if (!this.connected) {
            location.reload();
          }
        }, 3000);
      }
    });
    // fromEvent(window, 'blur').subscribe(() => this.disconnect());

    this.onDisconnect().subscribe(() => {
      if (!this.connectionSubscription) {
        console.log('WebSocket Reconnecting...');
        this.connectionSubscription = this.getConnection().subscribe();
      }
    });
    return this.connectionFacade.asObservable();
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

  public onReconnect(): Observable<any> {
    return this.reconnectionNotifier.asObservable();
  }

  public onDisconnect(): Observable<any> {
    return this.disconnectionNotifier.asObservable();
  }

  private getConnection(): WebSocketSubject<any> {
    if (!this.connection$) {
      this.connection$ = webSocket({
        url: this.serverAddress + '?userId=' + this.userId,
        openObserver: {
          next: (value) => {
            console.log('WebSocket open', value, 'connectionCount=', this.connectionCount);
            this.connected = true;

            this.openSubscription = this.connection$.subscribe(msg => this.connectionFacade.next(msg));
            if (this.connectionCount > 0) {
              this.reconnectionNotifier.next();
            }
            this.connectionCount++;
          },
        },
        closeObserver: {
          next: (value) => {
            console.log('WebSocket close', value);
            this.connected = false;
            this.openSubscription.unsubscribe();
            this.openSubscription = null;
            this.connection$ = null;
            this.connectionSubscription.unsubscribe();
            this.connectionSubscription = null;
            this.disconnectionNotifier.next();
          },
        },
        closingObserver: {
          next: (value) => {
            console.log('WebSocket closing', value);
          },
        },
      });
    }
    if (isDevMode()) {
      (window as any).socket = this.connection$;
    }
    return this.connection$;
  }
}
