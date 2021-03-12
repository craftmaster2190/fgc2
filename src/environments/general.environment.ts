export const generalEnvironment = {
  production: false,
  // cSpell: disable
  webSocketUrl: 'wss://bg5jxnp6g2.execute-api.us-east-1.amazonaws.com/api/',
  // cSpell: enable
  cognitoSettings: {
    aws_project_region: 'us-east-1',
    aws_cognito_region: 'us-east-1',
    // cSpell: disable
    aws_user_pools_id: 'us-east-1_qe0Tpp6YR',
    aws_user_pools_web_client_id: 'hrm7bd4h7ssfohncicnbsdm54',
    // cSpell: enable
    oauth: {
      domain: 'login.fantasygc.org',
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
