import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/decorators/legacy';
import { User } from './user.entity';

@Entity({ tableName: 'sessions' })
export class Session {
  @PrimaryKey()
  id!: string;

  @Property()
  userId!: string;

  @Property()
  expiresAt!: Date;

  @Property({ nullable: true })
  ipAddress?: string;

  @Property({ nullable: true })
  userAgent?: string;

  // Relation to User
  @ManyToOne(() => User, { joinColumn: 'userId', referenceColumnName: 'id' })
  user!: User;
}
