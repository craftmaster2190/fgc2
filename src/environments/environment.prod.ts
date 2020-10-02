export const environment = {
  production: true,

  cognitoSettings: {
    aws_project_region: 'us-east-1',
    aws_cognito_region: 'us-east-1',
    // cSpell: disable
    aws_user_pools_id: 'us-east-1_JXjir8RPT',
    aws_user_pools_web_client_id: '4t5r870u8moat405ousuv260c5',
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
      redirectSignIn: 'https://fantasygc.org/',
      redirectSignOut: 'https://fantasygc.org/',
      responseType: 'code',
    },
  },
};
