import * as fs from 'fs';

import resolvers from './resolvers/index.js';

import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';

const schemaFilePath = fs.existsSync('/var/task/schema.gql')
  ? '/var/task/schema.gql'
  : '../../../schema.gql';
const schema = loadSchemaSync(schemaFilePath, {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers: GraphQLSchema = addResolversToSchema({
  schema,
  resolvers,
});

export default schemaWithResolvers;
