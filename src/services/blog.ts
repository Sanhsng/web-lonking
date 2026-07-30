import { graphqlClient } from "@/lib/graphql";
import { gql } from "graphql-request";

export interface WPPostNode {
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
  categories?: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  blogFields?: {
    readTime: string;
    isFeatured: boolean;
    authorName: string;
    authorRole: string;
    authorAvatar?: {
      node: {
        sourceUrl: string;
      };
    };
  };
}

export interface WPCategoryNode {
  name: string;
  slug: string;
  count?: number;
}

const GET_POSTS_QUERY = gql`
  query GetPosts {
    posts {
      nodes {
        title
        slug
        excerpt
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        blogFields {
          readTime
          isFeatured
          authorName
          authorRole
          authorAvatar {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

const GET_POST_BY_SLUG_QUERY = gql`
  query GetPostBySlug($id: ID!) {
    post(id: $id, idType: SLUG) {
      title
      slug
      excerpt
      content
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      blogFields {
        readTime
        isFeatured
        authorName
        authorRole
        authorAvatar {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

const GET_CATEGORIES_QUERY = gql`
  query GetCategories {
    categories(where: { hideEmpty: false }) {
      nodes {
        name
        slug
        count
      }
    }
  }
`;

export const getPosts = async (): Promise<WPPostNode[]> => {
  try {
    const data = await graphqlClient.request<{ posts: { nodes: WPPostNode[] } }>(GET_POSTS_QUERY);
    return data.posts?.nodes || [];
  } catch (error) {
    console.error("Error fetching WP posts:", error);
    return [];
  }
};

export const getPostBySlug = async (slug: string): Promise<WPPostNode | null> => {
  try {
    const data = await graphqlClient.request<{ post: WPPostNode }>(GET_POST_BY_SLUG_QUERY, { id: slug });
    return data.post || null;
  } catch (error) {
    console.error(`Error fetching WP post with slug ${slug}:`, error);
    return null;
  }
};

export const getCategories = async (): Promise<WPCategoryNode[]> => {
  try {
    const data = await graphqlClient.request<{ categories: { nodes: WPCategoryNode[] } }>(GET_CATEGORIES_QUERY);
    return data.categories?.nodes || [];
  } catch (error) {
    console.error("Error fetching WP categories:", error);
    return [];
  }
};

