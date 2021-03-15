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

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(
    private readonly router: Router,
    private readonly userHolder: UserHolderService
  ) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return Auth.currentAuthenticatedUser()
      .then((user) => {
        this.userHolder.setUser(user);
        console.log('Allow to game');
        return true;
      })
      .catch(() => {
        console.log('Send home');
        // this.router.navigate(['/home']);
        return true;
      });
  }
}
