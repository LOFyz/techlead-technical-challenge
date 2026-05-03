import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMeQuery } from '../queries/get-me.query';
import { User } from '../../domain/entities/user.entity';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository';
import type { UserRepository } from '../../domain/repositories/user.repository';
import { Inject } from '@nestjs/common';

@QueryHandler(GetMeQuery)
export class GetMeHandler implements IQueryHandler<GetMeQuery> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository
  ) {}

  async execute(query: GetMeQuery): Promise<User | null> {
    const { userId } = query;
    if (!userId) {
      return null;
    }

    return this.userRepository.findById(userId);
  }
}
