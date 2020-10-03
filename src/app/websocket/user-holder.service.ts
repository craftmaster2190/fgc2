import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { first, map } from 'rxjs/operators';

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

  public getUserId(): Observable<string> {
    return this.user.pipe(
      map((user) => user.attributes?.sub),
      first()
    );
  }

  public isAdmin(): Observable<boolean> {
    return this.user.pipe(
      map(
        (user) => user.attributes?.['custom:is-admin']?.toLowerCase() === 'true'
      ),
      first()
    );
  }
}
