import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import Auth from '@aws-amplify/auth';
import { Observable } from 'rxjs';
import { UserHolderService } from './user-holder.service';
import { first, tap } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {
  public constructor(
    private readonly router: Router,
    private readonly userHolder: UserHolderService
  ) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return Auth.currentAuthenticatedUser({ bypassCache: false })
      .then((user) => {
        this.userHolder.setUser(user);
        console.log('IsAdmin?');
        return this.userHolder
          .isAdmin()
          .toPromise()
          .then((isAdmin) => {
            console.log('IsAdmin2:', isAdmin);
            return isAdmin;
          });
      })
      .then((isAdmin) => {
        if (!isAdmin) {
          console.error('Non-admin user tried to access admin page.');
        }
        console.log('Allow to admin');
        return isAdmin;
      })
      .catch(() => {
        console.log('Send home');
        this.router.navigate(['/home']);
        return false;
      });
  }
}
