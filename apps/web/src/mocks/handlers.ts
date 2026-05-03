/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { graphql, type GraphQLResponseResolver, type RequestHandlerOptions } from 'msw'
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Category = Node & {
  __typename?: 'Category';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type CategoryConnection = {
  __typename?: 'CategoryConnection';
  edges: Array<CategoryEdge>;
  pageInfo: PageInfo;
};

export type CategoryEdge = {
  __typename?: 'CategoryEdge';
  cursor: Scalars['String']['output'];
  node: Category;
};

export type MediaDetails = {
  __typename?: 'MediaDetails';
  height?: Maybe<Scalars['Int']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type MediaItem = Node & {
  __typename?: 'MediaItem';
  altText?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  mediaDetails?: Maybe<MediaDetails>;
  sourceUrl: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateUser: User;
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

export type Post = Node & {
  __typename?: 'Post';
  author?: Maybe<User>;
  categories?: Maybe<CategoryConnection>;
  content?: Maybe<Scalars['String']['output']>;
  date: Scalars['String']['output'];
  excerpt?: Maybe<Scalars['String']['output']>;
  featuredImage?: Maybe<MediaItem>;
  id: Scalars['ID']['output'];
  modified?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  tags?: Maybe<TagConnection>;
  title: Scalars['String']['output'];
};

export type PostConnection = {
  __typename?: 'PostConnection';
  edges: Array<PostEdge>;
  pageInfo: PageInfo;
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor: Scalars['String']['output'];
  node: Post;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  node?: Maybe<Node>;
  post?: Maybe<Post>;
  posts: PostConnection;
  user?: Maybe<User>;
  users: UserConnection;
};


export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPostArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  categoryName?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
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

export type Tag = Node & {
  __typename?: 'Tag';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type TagConnection = {
  __typename?: 'TagConnection';
  edges: Array<TagEdge>;
  pageInfo: PageInfo;
};

export type TagEdge = {
  __typename?: 'TagEdge';
  cursor: Scalars['String']['output'];
  node: Tag;
};

export type User = Node & {
  __typename?: 'User';
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

export type UserFragmentFragment = { id: string, name: string, email: string, image: string | null, role: string };

export type PostCardFragmentFragment = { id: string, title: string, slug: string, excerpt: string | null, date: string, featuredImage: { sourceUrl: string, altText: string | null } | null, categories: { edges: Array<{ node: { id: string, name: string, slug: string } }> } | null, author: { id: string, name: string, email: string, image: string | null, role: string } | null };

export type PostDetailFragmentFragment = { id: string, title: string, slug: string, content: string | null, excerpt: string | null, date: string, modified: string | null, featuredImage: { sourceUrl: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, categories: { edges: Array<{ node: { id: string, name: string, slug: string } }> } | null, tags: { edges: Array<{ node: { id: string, name: string, slug: string } }> } | null, author: { id: string, name: string, email: string, image: string | null, role: string } | null };

export type GetPostsQueryVariables = Exact<{
  first?: number | null | undefined;
  after?: string | null | undefined;
  categoryName?: string | null | undefined;
}>;


export type GetPostsQuery = { posts: { pageInfo: { hasNextPage: boolean, endCursor: string | null }, edges: Array<{ cursor: string, node: { id: string, title: string, slug: string, excerpt: string | null, date: string, featuredImage: { sourceUrl: string, altText: string | null } | null, categories: { edges: Array<{ node: { id: string, name: string, slug: string } }> } | null, author: { id: string, name: string, email: string, image: string | null, role: string } | null } }> } };

export type GetPostQueryVariables = Exact<{
  slug: string;
}>;


export type GetPostQuery = { post: { id: string, title: string, slug: string, content: string | null, excerpt: string | null, date: string, modified: string | null, featuredImage: { sourceUrl: string, altText: string | null, mediaDetails: { width: number | null, height: number | null } | null } | null, categories: { edges: Array<{ node: { id: string, name: string, slug: string } }> } | null, tags: { edges: Array<{ node: { id: string, name: string, slug: string } }> } | null, author: { id: string, name: string, email: string, image: string | null, role: string } | null } | null };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { me: { id: string, name: string, email: string, image: string | null, role: string } | null };


/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetPostsQuery(
 *   ({ query, variables }) => {
 *     const { first, after, categoryName } = variables;
 *     return HttpResponse.json({
 *       data: { posts }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockGetPostsQuery = (resolver: GraphQLResponseResolver<GetPostsQuery, GetPostsQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<GetPostsQuery, GetPostsQueryVariables>(
    'GetPosts',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetPostQuery(
 *   ({ query, variables }) => {
 *     const { slug } = variables;
 *     return HttpResponse.json({
 *       data: { post }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockGetPostQuery = (resolver: GraphQLResponseResolver<GetPostQuery, GetPostQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<GetPostQuery, GetPostQueryVariables>(
    'GetPost',
    resolver,
    options
  )

/**
 * @param resolver A function that accepts [resolver arguments](https://mswjs.io/docs/api/graphql#resolver-argument) and must always return the instruction on what to do with the intercepted request. ([see more](https://mswjs.io/docs/concepts/response-resolver#resolver-instructions))
 * @param options Options object to customize the behavior of the mock. ([see more](https://mswjs.io/docs/api/graphql#handler-options))
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetMeQuery(
 *   ({ query, variables }) => {
 *     return HttpResponse.json({
 *       data: { me }
 *     })
 *   },
 *   requestOptions
 * )
 */
export const mockGetMeQuery = (resolver: GraphQLResponseResolver<GetMeQuery, GetMeQueryVariables>, options?: RequestHandlerOptions) =>
  graphql.query<GetMeQuery, GetMeQueryVariables>(
    'GetMe',
    resolver,
    options
  )
