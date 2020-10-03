import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getUser } from './domain/user';
import { responseBody } from './domain/responseBody';
import { getUserForSub } from './domain/cognito';
import { WS } from './domain/ws';
import { CorrectAnswer, DB } from './domain/db';
import { bodyOf } from './domain/bodyOf';

interface UserAnswers {
  firstPresidency: Record<
    'henryBEyring' | 'dallinHOaks' | 'russellMNelson',
    {
      session;
      tieColor;
    }
  >;
  apostles: Record<
    | 'quentinLCook'
    | 'dieterFUchtdorf'
    | 'ulissesSoarses'
    | 'davidABednar'
    | 'mRussellBallard'
    | 'dToddChristofferson'
    | 'gerritWGong'
    | 'ronaldARasband'
    | 'neilLAndersen'
    | 'garyEStevenson'
    | 'daleGRenlund'
    | 'jeffreyRHolland',
    {
      session;
      tieColor;
    }
  >;
  choirColors: {
    [session: string]: string;
  };
  selectedHymns: Array<string>;
  newTemples: {
    world: Array<string>;
    usa: Array<string>;
  };
}

export async function handler(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  const sub = getUser(event).userId;
  const users = await getUserForSub(sub);
  console.log('Users', users);
  if (users?.length !== 1) {
    throw new Error('Ambiguous user!');
  }
  console.log('User', users[0]);
  if (
    users[0].Attributes.find(
      (attribute) => attribute.Name === 'custom:is-admin'
    )?.Value?.toLowerCase() !== 'true'
  ) {
    throw new Error('Non-admin user!');
  }

  const db = new DB();
  await db.putCorrectAnswer(bodyOf(event).answer);
  const correctAnswers = await db.getCorrectAnswers();
  console.log('correctAnswers', correctAnswers);

  const ws = new WS();
  const promises = [];
  promises.push(
    ws.sendToAll(event, { type: 'corrects', corrects: correctAnswers })
  );

  promises.push(
    db
      .getAllAnswers()
      .then(async (allAnswers) => {
        return Promise.all(
          allAnswers.map(async ({ userId, answers }) => {
            const userAnswers: UserAnswers = JSON.parse(answers);
            const score = correctAnswers.reduce(
              (value, correct: CorrectAnswer) => {
                let currentScore = 0;
                if (correct.temple) {
                  if (
                    userAnswers?.newTemples?.usa?.includes(correct.temple) ||
                    userAnswers?.newTemples?.world?.includes(correct.temple)
                  ) {
                    currentScore++;
                  }
                }
                if (correct.choirColor && correct.sessionName) {
                  if (
                    userAnswers?.choirColors?.[correct.sessionName] ===
                    correct.choirColor
                  ) {
                    currentScore++;
                  }
                }
                if (correct.song) {
                  if (userAnswers?.selectedHymns?.includes(correct.song)) {
                    currentScore++;
                  }
                }
                if (correct.speaker && correct.sessionName) {
                  if (
                    userAnswers?.firstPresidency?.[correct.speaker]?.session ===
                      correct.sessionName ||
                    userAnswers?.apostles?.[correct.speaker]?.session ===
                      correct.sessionName
                  ) {
                    currentScore++;
                  }
                }
                if (
                  correct.speaker &&
                  correct.tieColor &&
                  correct.sessionName
                ) {
                  if (
                    (userAnswers?.firstPresidency?.[correct.speaker]
                      ?.session === correct.sessionName &&
                      userAnswers?.firstPresidency?.[correct.speaker]
                        ?.tieColor === correct.tieColor) ||
                    (userAnswers?.apostles?.[correct.speaker]?.session ===
                      correct.sessionName &&
                      userAnswers?.apostles?.[correct.speaker]?.tieColor ===
                        correct.tieColor)
                  ) {
                    currentScore++;
                  }
                }

                if (currentScore > 0) {
                  console.log(
                    'User',
                    userId,
                    'got score',
                    currentScore,
                    'for',
                    userAnswers,
                    correctAnswers
                  );
                }

                return value + currentScore;
              },
              0
            );

            console.log('UserAnswers', userId, typeof answers);

            await db.putScore(userId, score);
            return { userId, score };
          })
        );
      })
      .then(async (justPutScores) => {
        console.log('Done putting scores, Getting scores', justPutScores);
        const scores = await db.getScores();
        console.log('scores', scores);
        return ws.sendToAll(event, { type: 'scores', scores });
      })
  );

  await Promise.all(promises);
  console.log('done');

  return responseBody(event);
}
