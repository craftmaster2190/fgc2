import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export async function handler(
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  console.log('event', event);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      message: 'Go Typescript',
      input: event,
    }),
  };
}
