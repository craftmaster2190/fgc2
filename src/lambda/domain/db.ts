import * as AWS from 'aws-sdk';
import { GetItemOutput } from 'aws-sdk/clients/dynamodb';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { getUserForSub } from './cognito';
import ScanOutput = DocumentClient.ScanOutput;
import UpdateItemOutput = DocumentClient.UpdateItemOutput;
import AttributeMap = DocumentClient.AttributeMap;
import DeleteItemOutput = DocumentClient.DeleteItemOutput;

export type CorrectAnswer = {
  timestamp;
  sessionName?;
  speaker?;
  tieColor?;
  choirColor?;
  song?;
  temple?;
};

export class DB {
  private static readonly ddb = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
  });

  public async getAllConnections(): Promise<AttributeMap[]> {
    const response = await DB.ddb
      .scan({
        TableName: 'Connections',
        ProjectionExpression: 'connectionId',
      })
      .promise();

    return (response.$response.data as ScanOutput)?.Items;
  }

  public async addConnection(connectionId, userId): Promise<UpdateItemOutput> {
    console.log('addConnection(', connectionId, userId, ')');
    return (
      await DB.ddb
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
        .promise()
    ).$response.data as UpdateItemOutput;
  }

  public async removeConnection(connectionId): Promise<DeleteItemOutput> {
    console.log('removeConnection(', connectionId, ')');
    return (
      await DB.ddb
        .delete({ TableName: 'Connections', Key: { connectionId } })
        .promise()
    ).$response.data as DeleteItemOutput;
  }

  public async putAnswers(userId, answers: any): Promise<UpdateItemOutput> {
    console.log('putAnswers(', userId, answers, ')');
    return (
      await DB.ddb
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
        .promise()
    ).$response.data as UpdateItemOutput;
  }

  public async getAnswers(userId: string): Promise<AttributeMap> {
    console.log('getAnswers(', userId, ')');
    const response = await DB.ddb
      .get({
        TableName: 'Answers',
        Key: { userId },
      })
      .promise();

    return (response.$response.data as GetItemOutput)?.Item;
  }

  public async getAllAnswers(): Promise<AttributeMap[]> {
    const response = await DB.ddb
      .scan({
        TableName: 'Answers',
      })
      .promise();

    return (response.$response.data as ScanOutput)?.Items;
  }

  public async putCorrectAnswer(
    correctAnswer: CorrectAnswer
  ): Promise<DocumentClient.UpdateItemOutput> {
    console.log('putCorrectAnswer(', correctAnswer, ')');

    const UpdateExpressionArray = [];
    const ExpressionAttributeValues = {};
    [
      'sessionName',
      'speaker',
      'tieColor',
      'choirColor',
      'song',
      'temple',
    ].forEach((key) => {
      if (correctAnswer?.[key]) {
        UpdateExpressionArray.push(`${key} = :${key}`);
        ExpressionAttributeValues[':' + key] = correctAnswer[key];
      }
    });

    const UpdateExpression = 'SET ' + UpdateExpressionArray.join(', ');

    return (
      await DB.ddb
        .update({
          TableName: 'Corrects',
          Key: {
            timestamp: correctAnswer.timestamp,
          },
          UpdateExpression,
          ExpressionAttributeValues,
          ReturnValues: 'UPDATED_NEW',
        })
        .promise()
    ).$response.data as UpdateItemOutput;
  }

  public async getCorrectAnswers(): Promise<AttributeMap[]> {
    const response = await DB.ddb
      .scan({
        TableName: 'Corrects',
      })
      .promise();

    return (response.$response.data as ScanOutput)?.Items;
  }

  public async putScore(
    userId: string,
    score: number
  ): Promise<DocumentClient.UpdateItemOutput> {
    console.log('putScore(', userId, score, ')');
    const username = (await getUserForSub(userId))[0].Username;

    return (
      await DB.ddb
        .update({
          TableName: 'Scores',
          Key: {
            userId,
          },
          UpdateExpression: 'set score = :score, username = :username',
          ExpressionAttributeValues: {
            ':username': username,
            ':score': score,
          },
          ReturnValues: 'UPDATED_NEW',
        })
        .promise()
    ).$response.data as UpdateItemOutput;
  }

  public async getScores(): Promise<AttributeMap[]> {
    const response = await DB.ddb
      .scan({
        TableName: 'Scores',
      })
      .promise();

    return (response.$response.data as ScanOutput)?.Items;
  }
}
