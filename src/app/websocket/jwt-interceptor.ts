import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Auth} from 'aws-amplify';

import {from, Observable} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  public constructor() {
  }

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(Auth.currentSession()).pipe(
      switchMap((auth: any) => {
        // switchMap() is used instead of map().

        const jwt = auth.accessToken.jwtToken;
        const withAuthRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        return next.handle(withAuthRequest);
      }),
      catchError((err) => {
        console.log('JwtInterceptor: Error ', err);
        return next.handle(request);
      })
    );
  }
}
