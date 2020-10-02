import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DB } from './domain/db';
import { WS } from './domain/ws';
import { getUser } from './domain/user';
import { responseBody } from './domain/responseBody';

export async function handler(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  const response = await new DB().getAnswers(getUser(event).userId);
  console.log(response);

  let answersObj = response?.answers ?? '{}';
  try {
    answersObj = JSON.parse(answersObj);
  } catch (e) {
    console.error('Unable to JSON parse', e);
  }
  await new WS().sendToClient(event, { type: 'answers', answers: answersObj });

  return responseBody(event);
}
