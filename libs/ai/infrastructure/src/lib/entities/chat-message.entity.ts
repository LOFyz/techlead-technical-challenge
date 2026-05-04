import { defineEntity, type InferEntity, p } from '@mikro-orm/core';

export enum MessageRole {
  USER = 'USER',
  AI = 'AI',
  SYSTEM = 'SYSTEM',
}

export const ChatMessageSchema = defineEntity({
  name: 'ChatMessage',
  tableName: 'chat_messages',
  properties: {
    id: p.uuid().primary().defaultRaw('gen_random_uuid()'),
    chatSessionId: p.uuid(),
    role: p.enum(() => MessageRole),
    content: p.text(),
    createdAt: p.type('timestamptz').defaultRaw('now()'),
  },
});

export type ChatMessage = InferEntity<typeof ChatMessageSchema>;