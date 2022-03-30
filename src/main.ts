import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import Amplify from 'aws-amplify';
import {env} from './environments/environment.getter';
import {Optional} from './app/util/optional';
import * as Sentry from '@sentry/browser';

(window as any).sentryIsRunning = Optional.of((window as any)._sentryDsn)
  .filter((dsn) => dsn && !dsn.startsWith('XXX'))
  .map((dsn) => {
    Sentry.init({dsn});
    return true;
  })
  .orElse(false);

(window as any).sendSentryData = (error): void => {
  // tslint:disable-next-line:no-console
  console.trace('sentry-error-handler.service', error);
  if ((window as any).sentryIsRunning) {
    Sentry.captureException(error.originalError || error);
  }
};

window.onunhandledrejection = (error) => (window as any).sendSentryData(error);
window.onerror = (error) => (window as any).sendSentryData(error);

Amplify.configure(env().cognitoSettings);

if (env().production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => {
    console.error('Main:', err);
    return Promise.reject(err);
  });
