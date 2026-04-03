#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AuthorizerExampleStack } from '../lib/authorizer-example-stack.js';

const app = new cdk.App();
const environment = app.node.tryGetContext('env');
const userPoolName = app.node.tryGetContext('userPoolName');
const config = app.node.tryGetContext(environment);

 
new AuthorizerExampleStack(app, 'AuthorizerExampleStack', {
  environment,
  userPoolName,
  ...config,
});
