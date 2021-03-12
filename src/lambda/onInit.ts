import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DB } from './domain/db';
import { WS } from './domain/ws';
import { getUser } from './domain/user';
import { responseBody } from './domain/responseBody';
import { initSentry } from './domain/sentry';

initSentry();

export async function handler(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  const db = new DB();
  const ws = new WS();

  const promises = [];
  promises.push(
    db.getAnswers(getUser(event).userId).then(async (response) => {
      console.log(response);

      let answersObj = response?.answers ?? '{}';
      try {
        answersObj = JSON.parse(answersObj);
      } catch (e) {
        console.error('Unable to JSON parse', e);
      }
      await ws.sendToClient(event, { type: 'answers', answers: answersObj });
    })
  );

  promises.push(
    db
      .getCorrectAnswers()
      .then((correctAnswers) =>
        ws.sendToClient(event, { type: 'corrects', corrects: correctAnswers })
      )
  );

  promises.push(
    db
      .getScores()
      .then((scores) => ws.sendToClient(event, { type: 'scores', scores }))
  );

  await Promise.all(promises);

  return responseBody(event);
}
