export const generalEnvironment = {
  production: false,
  // cSpell: disable
  webSocketUrl:
    'wss://2m22wxzt0k.execute-api.us-east-1.amazonaws.com/production',
  // cSpell: enable
  cognitoSettings: {
    aws_project_region: 'us-east-1',
    aws_cognito_region: 'us-east-1',
    // cSpell: disable
    aws_user_pools_id: 'us-east-1_XpUg7805q',
    aws_user_pools_web_client_id: '6pftb927d20umi65al3vlpjmoa',
    // cSpell: enable
    oauth: {
      domain: 'fantasygc.auth.us-east-1.amazoncognito.com',
      scope: [
        'phone',
        'email',
        'openid',
        'profile',
        'aws.cognito.signin.user.admin',
      ],
      redirectSignIn: 'http://localhost:4200/',
      redirectSignOut: 'http://localhost:4200/',
      responseType: 'code',
    },
  },
};
