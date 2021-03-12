import * as AWS from 'aws-sdk';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { env } from '../../environments/environment.getter';

export async function getUserForSub(
  sub: string
): Promise<CognitoIdentityServiceProvider.UserType[]> {
  const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

  return (
    await cognitoIdentityServiceProvider
      .listUsers({
        Filter: `sub = "${sub}"`,
        // cSpell: disable
        UserPoolId: env().cognitoSettings.aws_user_pools_id,
        // cSpell: enable
      })
      .promise()
  ).Users;
}
