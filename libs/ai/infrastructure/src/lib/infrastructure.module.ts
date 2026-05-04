import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ChatSessionSchema, ChatMessageSchema } from './entities';

@Module({
  imports: [
    MikroOrmModule.forFeature([ChatSessionSchema, ChatMessageSchema])
  ],
  exports: [MikroOrmModule],
})
export class DesafioInfrastructureModule {}