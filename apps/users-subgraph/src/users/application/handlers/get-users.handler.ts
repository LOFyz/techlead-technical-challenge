import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from '../queries/get-users.query';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository';
import type { UserRepository } from '../../domain/repositories/user.repository';
import { Inject } from '@nestjs/common';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository
  ) {}

  async execute(query: GetUsersQuery): Promise<any> {
    const { first, after } = query;
    const limit = first ?? 10;
    
    const [users] = await this.userRepository.findAll(limit + 1, after);

    const hasNextPage = users.length > limit;
    const nodes = hasNextPage ? users.slice(0, limit) : users;

    const edges = nodes.map((node) => ({
      cursor: Buffer.from(node.id).toString('base64'),
      node,
    }));

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage: false, // Simplified
        startCursor: edges.length > 0 ? edges[0].cursor : null,
        endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
      },
    };
  }
}
