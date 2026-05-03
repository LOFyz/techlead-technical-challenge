import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { UsersModule } from '../users/users.module';
import { AuthMiddleware } from '../users/middleware/auth.middleware';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      driver: PostgreSqlDriver,
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      user: process.env.DB_USER || 'users_db_user',
      password: process.env.DB_PASSWORD || 'users_db_password',
      dbName: process.env.DB_NAME || 'users_db',
      entities: ['./dist/**/*.entity.js'],
      entitiesTs: ['./src/**/*.entity.ts'],
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['**/*.graphql'],
      // Expose incoming headers to the GraphQL context for resolvers
      context: ({ req }: any) => ({ req }),
    }),
    UsersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply auth middleware to all routes so Better Auth handles session validation
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
