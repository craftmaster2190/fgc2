import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { WS } from './domain/ws';
import { responseBody } from './domain/responseBody';

export async function handler(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  console.error('event', event);
  await new WS().sendToClient(event, {
    type: 'error',
    error: 'Unknown action',
    details: event.body,
  });

  return responseBody(event);
}
