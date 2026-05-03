import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { DynamicTool } from '@langchain/community/tools/dynamic';
// @ts-ignore - langchain v1+ removed agents from exports in favor of langgraph
import { AgentExecutor, createOpenAIFunctionsAgent } from 'langchain/agents';
import { pull } from 'langchain/hub';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { toUIMessageStream } from '@ai-sdk/langchain';
import type { AiAgent, ChatMessage, AgentResponse } from '../../domain/services/agent.interface';

@Injectable()
export class LangChainAgent implements AiAgent {
  private model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4o',
      streaming: true,
    });
  }

  async chat(messages: ChatMessage[]): Promise<AgentResponse> {
    const tools = [
      new DynamicTool({
        name: 'query_blog',
        description: 'Consulta o blog para obter informações sobre posts, autores e categorias.',
        func: async (query) => `Resultados para: ${query}. (Simulação: Encontramos posts sobre DDD e Arquitetura)`,
      }),
    ];

    const prompt = await pull<ChatPromptTemplate>('hwchase17/openai-functions-agent');

    const agent = await createOpenAIFunctionsAgent({
      llm: this.model,
      tools,
      prompt,
    });

    const agentExecutor = new AgentExecutor({
      agent,
      tools,
    });

    const input = messages[messages.length - 1].content;
    const history = messages.slice(0, -1).map(m => [
      m.role === 'user' ? 'human' : 'ai', 
      m.content
    ]);

    const stream = await agentExecutor.stream({
      input,
      chat_history: history,
    });

    return {
      stream: toUIMessageStream(stream) as any
    };
  }
}
