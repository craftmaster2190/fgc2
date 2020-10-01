import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { getUser } from './domain/user';
import { DB } from './domain/db';
import { responseBody } from './domain/responseBody';

export async function handler(
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  await new DB().addConnection(
    event.requestContext.connectionId,
    getUser(event).userId
  );

  return responseBody(event);
}
