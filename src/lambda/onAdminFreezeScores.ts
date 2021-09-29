import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { responseBody } from './domain/responseBody';
import { initSentry } from './domain/sentry';
import * as AWS from 'aws-sdk';

initSentry();

export async function handler(
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> {
  const dynamodb = new AWS.DynamoDB({
    apiVersion: '2012-08-10',
  });

  const newTableName = 'ScoresApril2021';

  const listTablesData = await dynamodb.listTables({}).promise();
  const tableExists = !!listTablesData.TableNames.find(
    (name) => name === newTableName
  );

  console.log(`${newTableName} tableExists=${tableExists}`);

  if (!tableExists) {
    console.log(`Creating ` + newTableName);
    await dynamodb
      .createTable({
        TableName: newTableName,
        AttributeDefinitions: [
          {
            AttributeName: 'userId',
            AttributeType: 'S',
          },
        ],
        KeySchema: [
          {
            AttributeName: 'userId',
            KeyType: 'HASH',
          },
        ],
        // more params
      })
      .promise();

    let describeTableResult;
    while (describeTableResult?.Table?.TableStatus !== 'ACTIVE') {
      console.log(
        `Waiting for ${newTableName} status=${describeTableResult?.Table?.TableStatus}`
      );
      await new Promise((r) => setTimeout(r, 1000));

      describeTableResult = await dynamodb
        .describeTable({ TableName: newTableName })
        .promise();
    }
    console.log(`Done creating ` + newTableName);

    const documentClient = new AWS.DynamoDB.DocumentClient({
      apiVersion: '2012-08-10',
    });

    console.log(`Scanning Scores`);
    const scanResults = await documentClient
      .scan({ TableName: 'Scores' })
      .promise();
    console.log(`Done Scanning Scores`);

    await Promise.all(
      scanResults.Items.map((item, i) => {
        console.log(
          `Copying #${i}/${scanResults.Items.length} ` + JSON.stringify(item)
        );
        return documentClient.put({ TableName: newTableName, Item: item });
      })
    );
  }

  console.log('Done');

  return responseBody(event);
}
