import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class MikroOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: EntityRepository<User>,
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.repository.findOne(id);
  }

  async findAll(first?: number, after?: string, last?: number, before?: string): Promise<[User[], number]> {
    // Basic implementation of pagination for the repository
    const offset = after ? parseInt(Buffer.from(after, 'base64').toString().split(':')[1], 10) + 1 : 0;
    return this.repository.findAndCount({}, {
      limit: first,
      offset,
    });
  }

  async save(user: User): Promise<void> {
    const em = this.repository.getEntityManager();
    em.persist(user);
    await em.flush();
  }
}
