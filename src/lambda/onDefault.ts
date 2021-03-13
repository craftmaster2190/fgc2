import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { WS } from './domain/ws';
import { responseBody } from './domain/responseBody';
import { bodyOf } from './domain/bodyOf';
import { initSentry, sendSentry } from './domain/sentry';

initSentry();

export async function handler(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  if (bodyOf(event).action !== 'heartbeat') {
    console.error('event', event);
    const payload = {
      type: 'error',
      error: 'Unknown action',
      details: bodyOf(event),
    };
    await new WS().sendToClient(event, payload);
    sendSentry(payload);
  }

  return responseBody(event);
}
