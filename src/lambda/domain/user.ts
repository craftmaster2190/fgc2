import { bodyOf } from './bodyOf';
import { APIGatewayEvent } from 'aws-lambda';

export function getUser(event: APIGatewayEvent): { userId: string } {
  let userId = bodyOf(event).userId;

  if (!userId) {
    userId = event.queryStringParameters.userId;
  }

  if (!userId) {
    throw new Error('No userId!');
  }

  return { userId };
}
