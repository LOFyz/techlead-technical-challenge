import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      server: {
        // Here we'll later process the Better Auth cookie and return context
        context: ({ req }: any) => {
          return { headers: req.headers };
        },
      },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'users', url: process.env.USERS_SUBGRAPH_URL || 'http://localhost:3001/graphql' },
            { name: 'cms', url: process.env.CMS_SUBGRAPH_URL || 'http://localhost:8080/graphql' },
          ],
        }),
        buildService({ name, url }) {
          return new RemoteGraphQLDataSource({
            url,
            willSendRequest({ request, context }: any) {
              // Forward Better Auth context or headers to downstream subgraphs
              if (context.headers?.cookie) {
                request.http.headers.set('cookie', context.headers.cookie);
              }
              // We will add custom x-user-id logic later if we decode cookie here
            },
          });
        },
      },
    }),
  ],
})
export class AppModule {}
