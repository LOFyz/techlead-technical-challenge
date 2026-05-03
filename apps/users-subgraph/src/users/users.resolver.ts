import { Resolver, Query, Context, ResolveReference, Args, ResolveField, Parent } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { GetMeQuery } from './application/queries/get-me.query';
import { GetUsersQuery } from './application/queries/get-users.query';
import { User } from './domain/entities/user.entity';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query('me')
  async getMe(@Context() context: any): Promise<User | null> {
    // userId is injected by AuthMiddleware after Better Auth validates the session cookie
    const userId = context?.req?.userId;
    if (!userId) {
      return null;
    }
    return this.queryBus.execute(new GetMeQuery(userId));
  }

  @Query('users')
  async getUsers(
    @Args('first') first?: number,
    @Args('after') after?: string,
    @Args('last') last?: number,
    @Args('before') before?: string,
  ) {
    return this.queryBus.execute(new GetUsersQuery(first, after, last, before));
  }

  @ResolveField('sessions')
  async getSessions(@Parent() user: User) {
    // MikroORM automatically batches relations via populate, avoiding N+1
    // We fetch the relation and map it to a Relay connection manually here
    // or use a dedicated DataLoader + CQRS query if needed.
    // For simplicity of this example, we mock the Relay Connection for sessions.
    const edges: any[] = []; // user.sessions.getItems().map(...)
    return {
      edges,
      pageInfo: { hasNextPage: false, hasPreviousPage: false },
    };
  }

  // Apollo Federation ResolveReference
  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.queryBus.execute(new GetMeQuery(reference.id));
  }
}
