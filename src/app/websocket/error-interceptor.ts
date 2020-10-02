import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Auth } from 'aws-amplify';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  public constructor() {
    console.log('ErrorInterceptor');
  }

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          Auth.signOut({ global: true })
            .then((data) => console.log(data))
            .catch((err2) => console.error(err2));
        }

        // err.error is not null, if the ResponseEntity contains an Exception
        // err.error.message will give the custom message send from the server
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
