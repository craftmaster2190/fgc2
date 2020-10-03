import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { WS } from './domain/ws';
import { responseBody } from './domain/responseBody';
import { bodyOf } from './domain/bodyOf';

export async function handler(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  if (bodyOf(event).action !== 'heartbeat') {
    console.error('event', event);
    await new WS().sendToClient(event, {
      type: 'error',
      error: 'Unknown action',
      details: bodyOf(event),
    });
  }

  return responseBody(event);
}
