import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { Logger } from '@aws-lambda-powertools/logger';

const logger = new Logger();

export const handler: APIGatewayProxyHandler = async (
  event,
  context
): Promise<APIGatewayProxyResult> => {
  logger.info(
    `event: ${JSON.stringify(event)} context: ${JSON.stringify(context)}`
  );

  const { authorizer } = event.requestContext;
  const username = authorizer?.claims['cognito:username'];
  const email = authorizer?.claims.email;
  const iss = authorizer?.claims.iss;
  const index = iss?.lastIndexOf('amazonaws.com/');
  const userPoolId = iss?.substring(index + 'amazonaws.com/'.length);

  const cognito = new CognitoIdentityProviderClient({});
  const response = await cognito.send(
    new AdminGetUserCommand({
      UserPoolId: userPoolId,
      Username: username,
    })
  );
  const githubUsername = response.UserAttributes?.find(
    (attr) => attr.Name === 'custom:github'
  )?.Value;

  return Promise.resolve({
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      username,
      email,
      github: {
        username: githubUsername,
      },
    }),
  });
};
