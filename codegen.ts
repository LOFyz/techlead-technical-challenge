import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    'apps/users-subgraph/src/schema.graphql',
    'apps/ai-agent/src/schema.graphql'
  ],
  generates: {
    'libs/shared/types/src/lib/graphql-types.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers'
      ],
      config: {
        useIndexSignature: true,
        contextType: 'any',
        federation: true
      }
    },
    'apps/web/src/graphql/': {
      preset: 'client',
      plugins: []
    }
  }
};

export default config;