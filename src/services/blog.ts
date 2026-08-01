import { fetchFromUpstash } from "@/lib/redis";

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

export const getPosts = async (): Promise<WPPostNode[]> => {
  try {
    const posts = await fetchFromUpstash<{ nodes: WPPostNode[] }>("wp_posts_cache");
    return posts?.nodes || [];
  } catch (error) {
    console.error("Error fetching WP posts:", error);
    return [];
  }
};

export const getPostBySlug = async (slug: string): Promise<WPPostNode | null> => {
  try {
    const posts = await fetchFromUpstash<{ nodes: WPPostNode[] }>("wp_posts_cache");
    const allPosts = posts?.nodes || [];
    return allPosts.find((p) => p.slug === slug) || null;
  } catch (error) {
    console.error(`Error fetching WP post with slug ${slug}:`, error);
    return null;
  }
};

export const getCategories = async (): Promise<WPCategoryNode[]> => {
  try {
    const categories = await fetchFromUpstash<{ nodes: WPCategoryNode[] }>("wp_categories_cache");
    return categories?.nodes || [];
  } catch (error) {
    console.error("Error fetching WP categories:", error);
    return [];
  }
};
