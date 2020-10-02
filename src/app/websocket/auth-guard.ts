import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import Auth from '@aws-amplify/auth';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly router: Router) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return Auth.currentAuthenticatedUser()
      .then(() => {
        return true;
      })
      .catch(() => {
        this.router.navigate(['/home']);
        return false;
      });
  }
}
