import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getUser } from './domain/user';
import { DB } from './domain/db';
import { responseBody } from './domain/responseBody';
import { initSentry } from './domain/sentry';

initSentry();

export async function handler(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  await new DB().addConnection(
    event.requestContext.connectionId,
    getUser(event).userId
  );

  return responseBody(event);
}
