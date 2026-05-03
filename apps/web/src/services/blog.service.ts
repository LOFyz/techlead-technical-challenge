import { getClient } from '@/lib/apollo-client';
import { GET_POSTS, GET_POST } from '@/graphql/queries';

export const BlogService = {
  async getLatestPosts(first: number = 10) {
    const { data } = await getClient().query({
      query: GET_POSTS as any,
      variables: { first },
    });
    return (data as any)?.posts?.edges?.map((edge: any) => edge.node) || [];
  },

  async getPostBySlug(slug: string) {
    const { data } = await getClient().query({
      query: GET_POST as any,
      variables: { slug },
    });
    return (data as any)?.post;
  },

  async getAllPostSlugs() {
    const { data } = await getClient().query({
      query: GET_POSTS as any,
      variables: { first: 100 },
    });
    return (data as any)?.posts?.edges?.map((edge: any) => edge.node.slug) || [];
  }
};
