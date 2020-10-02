import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DB } from './domain/db';
import { responseBody } from './domain/responseBody';

export async function handler(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  await new DB().removeConnection(event.requestContext.connectionId);

  return responseBody(event);
}
