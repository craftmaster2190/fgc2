import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DB } from './domain/db';
import { responseBody } from './domain/responseBody';
import { initSentry } from './domain/sentry';

initSentry();

export async function handler(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  await new DB().removeConnection(event.requestContext.connectionId);

  return responseBody(event);
}
