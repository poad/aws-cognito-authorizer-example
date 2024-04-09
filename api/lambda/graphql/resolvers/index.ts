import { APIGatewayProxyEvent } from 'aws-lambda';
import {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { Resolvers } from '../types/generated/graphql';
import { Logger } from '@aws-lambda-powertools/logger';

const logger = new Logger();

const resolvers: Resolvers = {
  Query: {
    username: (_: unknown, __: unknown, context: unknown) => {
      logger.info(`event: ${JSON.stringify(context)}`);
      return (context as { event: APIGatewayProxyEvent }).event.requestContext
        .authorizer?.claims['cognito:username'];
    },
    email: (_: unknown, __: unknown, context: unknown) => {
      logger.info(`event: ${JSON.stringify(context)}`);

      const { authorizer } = (context as { event: APIGatewayProxyEvent }).event
        .requestContext;
      const email = authorizer?.claims.email;
      return email || null;
    },
    github: async (
      _: unknown,
      __: unknown,
      context: unknown
    ): Promise<{ username: string | null }> => {
      logger.info(`event: ${JSON.stringify(context)}`);

      const { authorizer } = (context as { event: APIGatewayProxyEvent }).event
        .requestContext;
      const username = authorizer?.claims['cognito:username'];
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
      return {
        username: githubUsername || null,
      };
    },
  },
  GitHub: {
    username: async (
      parent: unknown,
      _: unknown,
      context: unknown
    ): Promise<string | null> => {
      logger.info(
        `parent: ${JSON.stringify(parent)} event: ${JSON.stringify(context)}`
      );

      const { authorizer } = (context as { event: APIGatewayProxyEvent }).event
        .requestContext;
      const username = authorizer?.claims['cognito:username'];
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
      return githubUsername || null;
    },
  },
};

export default resolvers;
