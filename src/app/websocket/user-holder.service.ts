import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserHolderService {
  private readonly user = new ReplaySubject<any>(1);

  public constructor() {}

  public setUser(user): void {
    console.log('setUser', user);
    this.user.next(user);
  }

  public watchUser(): Observable<any> {
    return this.user.asObservable();
  }

  public watchUserId(): Observable<string> {
    return this.user.pipe(map((user) => user.attributes?.sub));
  }

  public watchIsAdmin(): Observable<boolean> {
    return this.user.pipe(
      map(
        (user) => user.attributes?.['custom:is-admin']?.toLowerCase() === 'true'
      )
    );
  }
}
