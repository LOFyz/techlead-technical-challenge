import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './domain/entities/user.entity';
import { Session } from './domain/entities/session.entity';
import { UsersResolver } from './users.resolver';
import { GetMeHandler } from './application/handlers/get-me.handler';
import { GetUsersHandler } from './application/handlers/get-users.handler';
import { AuthController } from './auth.controller';
import { USER_REPOSITORY } from './domain/repositories/user.repository';
import { MikroOrmUserRepository } from './infrastructure/repositories/mikro-orm-user.repository';

const CommandHandlers: any[] = [];
const QueryHandlers = [GetMeHandler, GetUsersHandler];

@Module({
  imports: [
    CqrsModule,
    MikroOrmModule.forFeature([User, Session])
  ],
  controllers: [AuthController],
  providers: [
    UsersResolver,
    {
      provide: USER_REPOSITORY,
      useClass: MikroOrmUserRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [USER_REPOSITORY],
})
export class UsersModule {}
