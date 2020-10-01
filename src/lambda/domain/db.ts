import * as AWS from 'aws-sdk';
import { GetItemOutput } from 'aws-sdk/clients/dynamodb';

export class DB {
  private static readonly ddb = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
  });

  public async getAllConnections() {
    return DB.ddb
      .scan({
        TableName: 'Connections',
        ProjectionExpression: 'connectionId',
      })
      .promise();
  }

  public async addConnection(connectionId, userId) {
    console.log('addConnection(', connectionId, userId, ')');
    return DB.ddb
      .update({
        TableName: 'Connections',
        Key: {
          connectionId,
        },
        UpdateExpression: 'set userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId,
        },
        ReturnValues: 'UPDATED_NEW',
      })
      .promise();
  }

  public async removeConnection(connectionId) {
    console.log('removeConnection(', connectionId, ')');
    return DB.ddb
      .delete({ TableName: 'Connections', Key: { connectionId } })
      .promise();
  }

  public async putAnswers(userId, answers: any) {
    console.log('putAnswers(', userId, answers, ')');
    return DB.ddb
      .update({
        TableName: 'Answers',
        Key: {
          userId,
        },
        UpdateExpression: 'set answers = :answers',
        ExpressionAttributeValues: {
          ':answers': JSON.stringify(answers),
        },
        ReturnValues: 'UPDATED_NEW',
      })
      .promise();
  }

  public async getAnswers(userId: string): Promise<any> {
    console.log('getAnswers(', userId, ')');
    const response = await DB.ddb
      .get({
        TableName: 'Answers',
        Key: { userId },
      })
      .promise();

    return (response.$response.data as GetItemOutput)?.Item;
  }
}
