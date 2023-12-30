import { AuthConfig } from "@aws-amplify/core";

const awsconfig = {
  aws_project_region: process.env.NEXT_PUBLIC_AWS_REGION as string,
  aws_cognito_identity_pool_id: process.env.NEXT_PUBLIC_AWS_COGNITO_ID_POOL_ID,
  aws_cognito_region: process.env.NEXT_PUBLIC_AWS_REGION as string,
  aws_user_pools_id: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_AWS_CLIENT_ID,
  oauth: {
    domain: process.env.NEXT_PUBLIC_AWS_COGNITO_OAUTH_DOMAIN,
    scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
    redirectSignIn: process.env.NEXT_PUBLIC_AWS_COGNITO_OAUTH_REDIRECT_SIGNIN,
    redirectSignOut: process.env.NEXT_PUBLIC_AWS_COGNITO_OAUTH_REDIRECT_SIGNOUT,
    responseType: 'code',
  },
  federationTarget: 'COGNITO_USER_POOLS',
  identityProviderName: 'AzureAD',

  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID as string,
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_CLIENT_ID as string,
      identityPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_ID_POOL_ID as string,
      loginWith: {
        oauth: {
          domain: process.env.NEXT_PUBLIC_AWS_COGNITO_OAUTH_DOMAIN as string,
          scopes: [
            'email',
            'profile',
            'openid',
            'aws.cognito.signin.user.admin',
          ],
          redirectSignIn: [
            process.env.NEXT_PUBLIC_AWS_COGNITO_OAUTH_REDIRECT_SIGNIN as string,
          ],
          redirectSignOut: [
            process.env
              .NEXT_PUBLIC_AWS_COGNITO_OAUTH_REDIRECT_SIGNOUT as string,
          ],
          responseType: 'code',
        },
      },
    },
  } as AuthConfig,
};

export default awsconfig;
