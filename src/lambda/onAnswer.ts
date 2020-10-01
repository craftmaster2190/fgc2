import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DB } from './domain/db';
import { getUser } from './domain/user';
import { bodyOf } from './domain/bodyOf';
import { responseBody } from './domain/responseBody';

export async function handler(
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  await new DB().putAnswers(getUser(event).userId, bodyOf(event).answers);

  return responseBody(event);
}
