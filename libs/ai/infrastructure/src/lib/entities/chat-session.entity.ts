import { defineEntity, type InferEntity, p } from '@mikro-orm/core';

export const ChatSessionSchema = defineEntity({
  name: 'ChatSession',
  tableName: 'chat_sessions',
  properties: {
    id: p.uuid().primary().defaultRaw('gen_random_uuid()'),
    userId: p.uuid(),
    createdAt: p.type('timestamptz').defaultRaw('now()'),
    updatedAt: p.type('timestamptz').defaultRaw('now()'),
  },
});

export type ChatSession = InferEntity<typeof ChatSessionSchema>;