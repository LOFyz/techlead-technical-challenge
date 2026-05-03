import { Controller, Post, Body, Inject } from '@nestjs/common';
import { AI_AGENT } from './domain/services/agent.interface';
import type { AiAgent } from './domain/services/agent.interface';

@Controller('ai')
export class AiController {
  constructor(
    @Inject(AI_AGENT)
    private readonly aiAgent: AiAgent
  ) {}

  @Post('chat')
  async chat(@Body() body: { messages: any[] }) {
    const response = await this.aiAgent.chat(body.messages);
    return response.stream;
  }
}
