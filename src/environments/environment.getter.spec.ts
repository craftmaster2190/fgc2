import { env } from './environment.getter';

describe('env', () => {
  it('should overwrite redirectSignIn', () => {
    const value = env().cognitoSettings.oauth.redirectSignIn;
    expect(value).toBe('http://localhost:4200/');
  });
});
