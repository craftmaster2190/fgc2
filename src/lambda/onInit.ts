import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DB } from './domain/db';
import { WS } from './domain/ws';
import { getUser } from './domain/user';
import { responseBody } from './domain/responseBody';

export async function handler(
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  const { answers } = await new DB().getAnswers(getUser(event).userId);
  console.log(answers);

  let answersObj = answers;
  try {
    answersObj = JSON.parse(answers);
  } catch (e) {
    console.error('Unable to JSON parse', e);
  }
  await new WS().sendToClient(event, { type: 'answers', answers: answersObj });

  return responseBody(event);
}
