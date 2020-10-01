import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DB } from './domain/db';
import { WS } from './domain/ws';
import { getUser } from './domain/user';
import { responseBody } from './domain/responseBody';

export async function handler(
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const answers = await new DB().getAnswers(getUser(event).userId);
  await new WS().sendToClient(event, { type: 'answers', answers });

  return responseBody(event);
}
