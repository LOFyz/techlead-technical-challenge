import { gql } from '../';

export const USER_FRAGMENT = gql(`
  fragment UserFragment on User {
    id
    name
    email
    image
    role
  }
`);

export const POST_CARD_FRAGMENT = gql(`
  fragment PostCardFragment on Post {
    id
    title
    slug
    excerpt
    date
    featuredImage {
      sourceUrl
      altText
    }
    categories {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
    author {
      ...UserFragment
    }
  }
`);

export const POST_DETAIL_FRAGMENT = gql(`
  fragment PostDetailFragment on Post {
    id
    title
    slug
    content
    excerpt
    date
    modified
    featuredImage {
      sourceUrl
      altText
      mediaDetails {
        width
        height
      }
    }
    categories {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
    tags {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
    author {
      ...UserFragment
    }
  }
`);
