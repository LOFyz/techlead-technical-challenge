import { gql } from '../';

export const GET_POSTS = gql(`
  query GetPosts($first: Int = 10, $after: String, $categoryName: String) {
    posts(first: $first, after: $after, categoryName: $categoryName) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          ...PostCardFragment
        }
      }
    }
  }
`);

export const GET_POST = gql(`
  query GetPost($slug: String!) {
    post(slug: $slug) {
      ...PostDetailFragment
    }
  }
`);

export const GET_ME = gql(`
  query GetMe {
    me {
      id
      name
      email
      image
      role
    }
  }
`);
