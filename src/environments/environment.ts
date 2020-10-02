// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

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
      redirectSignIn: 'http://localhost:4200/',
      redirectSignOut: 'http://localhost:4200/',
      responseType: 'code',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
