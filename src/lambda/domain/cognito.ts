import * as AWS from 'aws-sdk';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

export async function getUserForSub(
  sub: string
): Promise<CognitoIdentityServiceProvider.UserType[]> {
  const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

  return (
    await cognitoIdentityServiceProvider
      .listUsers({
        Filter: `sub = "${sub}"`,
        // cSpell: disable
        UserPoolId: 'us-east-1_JXjir8RPT',
        // cSpell: enable
      })
      .promise()
  ).Users;
}
