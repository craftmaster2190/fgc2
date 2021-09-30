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
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
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
  }

  const documentClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: '2012-08-10',
  });

  console.log(`Scanning Scores`);
  let scanItems: AWS.DynamoDB.DocumentClient.ItemList = [];
  const scanParams: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: 'Scores',
  };
  while (true) {
    const scanResults = await documentClient.scan(scanParams).promise();
    scanItems = [...scanItems, ...scanResults.Items];

    // continue scanning if we have more movies, because
    // scan can retrieve a maximum of 1MB of data
    if (typeof scanResults.LastEvaluatedKey !== 'undefined') {
      console.log('Scanning for more...');
      scanParams.ExclusiveStartKey = scanResults.LastEvaluatedKey;
    } else {
      break;
    }
  }

  console.log(`Done Scanning Scores`);

  await Promise.all(
    scanItems.map(async (item, i) => {
      console.log(`Copying #${i}/${scanItems.length} ` + JSON.stringify(item));
      const putResponse = await documentClient
        .put({ TableName: newTableName, Item: item })
        .promise();
      console.log(`Done copying ${i} ` + putResponse);
    })
  );

  console.log('Done');

  return responseBody(event);
}
