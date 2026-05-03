import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './docs/schema.graphql', // Global schema
  documents: ['apps/web/src/**/*.tsx', 'apps/web/src/**/*.ts'],
  generates: {
    'apps/web/src/graphql/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: { unmaskFunctionName: 'getFragmentData' }
      }
    },
    'apps/web/src/mocks/handlers.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-msw'],
    }
  },
  ignoreNoDocuments: true,
};

export default config;
