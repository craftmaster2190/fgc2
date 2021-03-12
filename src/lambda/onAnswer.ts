import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DB } from './domain/db';
import { getUser } from './domain/user';
import { bodyOf } from './domain/bodyOf';
import { responseBody } from './domain/responseBody';
import { initSentry } from './domain/sentry';

initSentry();

export async function handler(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  await new DB().putAnswers(getUser(event).userId, bodyOf(event).answers);

  return responseBody(event);
}
