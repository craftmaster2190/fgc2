export function initSentry(): void {
  const Sentry = require('@sentry/serverless');

  const dsn = 'XXX_SENTRY_DSN_XXX';

  Sentry.AWSLambda.init({
    dsn,

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}
