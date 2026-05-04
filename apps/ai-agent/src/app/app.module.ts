import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { 
  DesafioInfrastructureModule, 
  ChatSessionSchema, 
  ChatMessageSchema 
} from '@desafio/infrastructure';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['**/*.graphql'],
    }),
    MikroOrmModule.forRoot({
      driver: PostgreSqlDriver,
      dbName: 'ai_agent_db',
      clientUrl: 'postgresql://postgres:postgres@localhost:5432/ai_agent_db',
      entities: [ChatSessionSchema, ChatMessageSchema],
      debug: true,
      allowGlobalContext: true,
      schemaGenerator: {
        createForeignKeyConstraints: false,
      },
    }),
    DesafioInfrastructureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}