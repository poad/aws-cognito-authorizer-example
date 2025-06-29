// @ts-check

import stylistic from '@stylistic/eslint-plugin';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import typescriptParser from 'typescript-eslint';
import * as graphqlESLint from '@graphql-eslint/eslint-plugin';

export default [
  {
    ignores: [
      '**/*.d.ts',
      '*.js',
      'src/tsconfig.json',
      'src/next-env.d.ts',
      'src/stories',
      'node_modules/**/*',
    ],
  },
  {
    files: ['**/*.gql'],
    languageOptions: {
      parser: graphqlESLint,
    },
    plugins: {
      '@graphql-eslint': graphqlESLint,
    },
  },
  {
    languageOptions: {
      parser: typescriptParser,
    },
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      '@next/next': nextPlugin,
      '@stylistic': stylistic,
      '@stylistic/ts': stylistic,
      '@stylistic/jsx': stylistic,
    },
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-duplicate-head': 'off',
      '@next/next/no-img-element': 'error',
      '@next/next/no-page-custom-font': 'off',
      'no-html-link-for-pages': 'off',
      '@stylistic/semi': 'error',
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/jsx/jsx-indent': ['error', 2],
    },
  },
  {
    ignores: ['./.next/*'],
  },
];
