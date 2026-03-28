import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import-x';
import pluginPromise from 'eslint-plugin-promise';
import { configs, parser } from 'typescript-eslint';
import * as graphqlPlugin from '@graphql-eslint/eslint-plugin';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

import { includeIgnoreFile } from '@eslint/compat';
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, "./.gitignore");

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  {
    ignores: [
      '**/*.d.ts',
      '**/*.js',
      'node_modules/**/*',
      '**/.next/*',
      'api/lambda/graphql/types/generated/graphql.ts',
    ],
  },
  {
    files: ['**/*.gql'],
    ...graphqlPlugin.configs,
    languageOptions: {
      parser: graphqlPlugin.parseForESLint,
    },
    rules: {
      '@graphql-eslint/known-type-names': 'error',
      // ... other GraphQL-ESLint rules
    },
  },
  ...configs.strict,
  ...configs.stylistic,
  // @ts-ignore
  pluginPromise.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    languageOptions: {
      parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect',
      },
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
      'import/internal-regex': '^~/',
      'import/resolver': createTypeScriptImportResolver({
        // TypeScript compiler options
        // You can add options here if needed
        // For example:
        // project: './tsconfig.json',
        // alwaysTryTypes: true,
      }),
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/semi': 'error',
      '@stylistic/indent': ['error', 2],
    },
  },
);
