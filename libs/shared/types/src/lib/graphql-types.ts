import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  _FieldSet: { input: unknown; output: unknown; }
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  role: MessageRole;
};

export type ChatSession = {
  __typename?: 'ChatSession';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  messages: Array<ChatMessage>;
  updatedAt: Scalars['String']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type ChatSessionConnection = {
  __typename?: 'ChatSessionConnection';
  edges: Array<ChatSessionEdge>;
  pageInfo: PageInfo;
};

export type ChatSessionEdge = {
  __typename?: 'ChatSessionEdge';
  cursor: Scalars['String']['output'];
  node: ChatSession;
};

export enum MessageRole {
  Ai = 'AI',
  System = 'SYSTEM',
  User = 'USER'
}

export type Mutation = {
  __typename?: 'Mutation';
  sendMessage: ChatSession;
  updateUser: User;
};


export type MutationSendMessageArgs = {
  chatSessionId?: InputMaybe<Scalars['ID']['input']>;
  content: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  chatSession?: Maybe<ChatSession>;
  me?: Maybe<User>;
  node?: Maybe<Node>;
  user?: Maybe<User>;
  users: UserConnection;
};


export type QueryChatSessionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type Session = Node & {
  __typename?: 'Session';
  expiresAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  ipAddress?: Maybe<Scalars['String']['output']>;
  userAgent?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type SessionConnection = {
  __typename?: 'SessionConnection';
  edges: Array<SessionEdge>;
  pageInfo: PageInfo;
};

export type SessionEdge = {
  __typename?: 'SessionEdge';
  cursor: Scalars['String']['output'];
  node: Session;
};

export type User = Node & {
  __typename?: 'User';
  chatSessions: ChatSessionConnection;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  role: Scalars['String']['output'];
  sessions: SessionConnection;
  updatedAt: Scalars['String']['output'];
};


export type UserChatSessionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String']['output'];
  node: User;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ReferenceResolver<TResult, TReference, TContext> = (
      reference: TReference,
      context: TContext,
      info: GraphQLResolveInfo
    ) => Promise<TResult> | TResult;

      type ScalarCheck<T, S> = S extends true ? T : NullableCheck<T, S>;
      type NullableCheck<T, S> = Maybe<T> extends T ? Maybe<ListCheck<NonNullable<T>, S>> : ListCheck<T, S>;
      type ListCheck<T, S> = T extends (infer U)[] ? NullableCheck<U, S>[] : GraphQLRecursivePick<T, S>;
      export type GraphQLRecursivePick<T, S> = { [K in keyof T & keyof S]: ScalarCheck<T[K], S[K]> };
    

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of federation types */
export type FederationTypes = ResolversObject<{
  ChatSession: ChatSession;
  Session: Session;
  User: User;
}>;

/** Mapping of federation reference types */
export type FederationReferenceTypes = ResolversObject<{
  ChatSession:
    ( { __typename: 'ChatSession' }
    & GraphQLRecursivePick<FederationTypes['ChatSession'], {"id":true}> );
  Session:
    ( { __typename: 'Session' }
    & GraphQLRecursivePick<FederationTypes['Session'], {"id":true}> );
  User:
    ( { __typename: 'User' }
    & GraphQLRecursivePick<FederationTypes['User'], {"id":true}> );
}>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = ResolversObject<{
  Node:
    | ( Session )
    | ( User )
  ;
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  ChatMessage: ResolverTypeWrapper<ChatMessage>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  ChatSession: ResolverTypeWrapper<ChatSession>;
  ChatSessionConnection: ResolverTypeWrapper<ChatSessionConnection>;
  ChatSessionEdge: ResolverTypeWrapper<ChatSessionEdge>;
  MessageRole: MessageRole;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Session: ResolverTypeWrapper<Session>;
  SessionConnection: ResolverTypeWrapper<SessionConnection>;
  SessionEdge: ResolverTypeWrapper<SessionEdge>;
  User: ResolverTypeWrapper<User>;
  UserConnection: ResolverTypeWrapper<UserConnection>;
  UserEdge: ResolverTypeWrapper<UserEdge>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  ChatMessage: ChatMessage;
  String: Scalars['String']['output'];
  ID: Scalars['ID']['output'];
  ChatSession: ChatSession | FederationReferenceTypes['ChatSession'];
  ChatSessionConnection: ChatSessionConnection;
  ChatSessionEdge: ChatSessionEdge;
  Mutation: Record<PropertyKey, never>;
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  PageInfo: PageInfo;
  Boolean: Scalars['Boolean']['output'];
  Query: Record<PropertyKey, never>;
  Int: Scalars['Int']['output'];
  Session: Session | FederationReferenceTypes['Session'];
  SessionConnection: SessionConnection;
  SessionEdge: SessionEdge;
  User: User | FederationReferenceTypes['User'];
  UserConnection: UserConnection;
  UserEdge: UserEdge;
}>;

export type ChatMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatMessage'] = ResolversParentTypes['ChatMessage']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['MessageRole'], ParentType, ContextType>;
}>;

export type ChatSessionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatSession'] = ResolversParentTypes['ChatSession'], FederationReferenceType extends FederationReferenceTypes['ChatSession'] = FederationReferenceTypes['ChatSession']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['ChatSession']> | FederationReferenceType, FederationReferenceType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['ChatMessage']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export type ChatSessionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatSessionConnection'] = ResolversParentTypes['ChatSessionConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['ChatSessionEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
}>;

export type ChatSessionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChatSessionEdge'] = ResolversParentTypes['ChatSessionEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ChatSession'], ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  sendMessage?: Resolver<ResolversTypes['ChatSession'], ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'content'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id'>>;
}>;

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Session' | 'User', ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  chatSession?: Resolver<Maybe<ResolversTypes['ChatSession']>, ParentType, ContextType, RequireFields<QueryChatSessionArgs, 'id'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<ResolversTypes['UserConnection'], ParentType, ContextType, Partial<QueryUsersArgs>>;
}>;

export type SessionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session'], FederationReferenceType extends FederationReferenceTypes['Session'] = FederationReferenceTypes['Session']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Session']> | FederationReferenceType, FederationReferenceType, ContextType>;
  expiresAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  ipAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userAgent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SessionConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['SessionConnection'] = ResolversParentTypes['SessionConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['SessionEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
}>;

export type SessionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SessionEdge'] = ResolversParentTypes['SessionEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Session'], ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'], FederationReferenceType extends FederationReferenceTypes['User'] = FederationReferenceTypes['User']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['User']> | FederationReferenceType, FederationReferenceType, ContextType>;
  chatSessions?: Resolver<ResolversTypes['ChatSessionConnection'], ParentType, ContextType, Partial<UserChatSessionsArgs>>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  emailVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sessions?: Resolver<ResolversTypes['SessionConnection'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['UserEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
}>;

export type UserEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  ChatMessage?: ChatMessageResolvers<ContextType>;
  ChatSession?: ChatSessionResolvers<ContextType>;
  ChatSessionConnection?: ChatSessionConnectionResolvers<ContextType>;
  ChatSessionEdge?: ChatSessionEdgeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  SessionConnection?: SessionConnectionResolvers<ContextType>;
  SessionEdge?: SessionEdgeResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
}>;

