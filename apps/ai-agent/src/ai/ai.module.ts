import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AI_AGENT } from './domain/services/agent.interface';
import { LangChainAgent } from './infrastructure/langchain/langchain-agent.service';

@Module({
  providers: [
    {
      provide: AI_AGENT,
      useClass: LangChainAgent,
    },
  ],
  controllers: [AiController],
})
export class AiModule {}
