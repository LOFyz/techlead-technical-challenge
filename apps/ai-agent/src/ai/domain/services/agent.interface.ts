export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AgentResponse {
  stream: any; // Stream object for Vercel AI SDK
}

export interface AiAgent {
  chat(messages: ChatMessage[]): Promise<AgentResponse>;
}

export const AI_AGENT = Symbol('AiAgent');
