import * as AWS from 'aws-sdk';
import { DB } from './db';

export class WS {
  public async sendToClient(event, payload) {
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
}
