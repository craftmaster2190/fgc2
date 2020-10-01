import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

export async function handler(
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
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

async function connectionHandler(event, context): Promise<void> {
  // await saveConnectionInfoToDynamoDB(event.requestContext.connectionId);
  // return success;
  // if we would try to post to the websocket management api here, we would get a 410
  // we must first "successfully" execute this connection handler to establish the WebSocket
}

// assume there is other logic and processes that save "channel" subscriptions for each
// subscriber, along with their connectionId information

async function messageHandler(event, context): Promise<void> {
  const payload = JSON.parse(event.body);

  // fetch anyone subscribed to a channel defined in payload for a datastore
  // const subscribers = await fetchSubscribersToChannel(payload.channelId);

  // for each subscriber to the channel, we have to send a message per connection
  // (no batch, one call to Api Gateway Management API per message)
  // const messages = subscribers.map(async (subscriber) => {
  //   return sendMessageToSubscriber(subscriber.connectionId, payload)
  // })

  // make sure they all send
  // await Promise.all(messages)

  // still have to let api gateway know we were successful!
  // return success;
}

const sendMessageToClient = (url, connectionId, payload) =>
  new Promise((resolve, reject) => {
    const apigatewaymanagementapi = new AWS.ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      endpoint: url,
    });
    apigatewaymanagementapi.postToConnection(
      {
        ConnectionId: connectionId, // connectionId of the receiving ws-client
        Data: JSON.stringify(payload),
      },
      (err, data) => {
        if (err) {
          console.log('err is', err);
          reject(err);
        }
        resolve(data);
      }
    );
  });

module.exports.defaultHandler = async (event, context) => {
  const domain = event.requestContext.domainName;
  const stage = event.requestContext.stage;
  const connectionId = event.requestContext.connectionId;
  const callbackUrlForAWS = util.format(
    util.format('https://%s/%s', domain, stage)
  ); //construct the needed url
  await sendMessageToClient(callbackUrlForAWS, connectionId, event);

  return {
    statusCode: 200,
  };
};
