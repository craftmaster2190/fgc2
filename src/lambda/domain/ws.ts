import * as AWS from 'aws-sdk';
import { DB } from './db';
import { APIGatewayEvent } from 'aws-lambda';

export class WS {
  public async sendToClient(
    event:
      | { requestContext: { domainName; stage; connectionId } }
      | APIGatewayEvent,
    payload
  ): Promise<PromiseResult<{}, AWSError>> {
    console.log('sendToClient(', event, payload, ')');
    const apigwManagementApi = new AWS.ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      endpoint:
        event.requestContext.domainName + '/' + event.requestContext.stage,
    });

    try {
      return await apigwManagementApi
        .postToConnection({
          ConnectionId: event.requestContext.connectionId, // connectionId of the receiving ws-client
          Data: JSON.stringify(payload),
        })
        .promise();
    } catch (e) {
      console.error(
        'Unable to sendToClient',
        event.requestContext.connectionId,
        e
      );
      await new DB().removeConnection(event.requestContext.connectionId);
      throw e;
    }
  }

  public async sendToAll(event, payload): Promise<void> {
    const db = new DB();
    const allConnections = await db.getAllConnections();
    console.log('allConnections', allConnections);

    await Promise.all(
      allConnections.map(async (connection) => {
        try {
          const mockEvent = {
            requestContext: {
              connectionId: connection.connectionId,
              domainName: event.requestContext.domainName,
              stage: event.requestContext.stage,
            },
          };

          return await new WS().sendToClient(mockEvent, payload);
        } catch (e) {
          console.log(e);
        }
      })
    );
  }
}
