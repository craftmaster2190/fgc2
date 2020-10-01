import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DB } from './domain/db';
import { responseBody } from './domain/responseBody';

export async function handler(
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  await new DB().removeConnection(event.requestContext.connectionId);

  return responseBody(event);
}
