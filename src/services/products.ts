import { fetchFromUpstash } from "@/lib/redis";
import { WPProduct } from "@/types/wordpress";

export async function getProducts(): Promise<WPProduct[]> {
  try {
    const products = await fetchFromUpstash<{ nodes: WPProduct[] }>("wp_products_cache");
    return products?.nodes || [];
  } catch (error) {
    console.error("Error fetching WP products:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<WPProduct | null> {
  try {
    const products = await fetchFromUpstash<{ nodes: WPProduct[] }>("wp_products_cache");
    const allProducts = products?.nodes || [];
    return allProducts.find((p) => p.slug === slug) || null;
  } catch (error) {
    console.error(`Error fetching WP product with slug ${slug}:`, error);
    return null;
  }
}

export const getProductCategories = async () => {
  try {
    const data = await fetchFromUpstash<{
      nodes: {
        name: string;
        slug: string;
        productCategoryFields?: {
          categoryImage?: {
            node?: {
              sourceUrl: string;
            }
          }
        }
      }[]
    }>("wp_product_categories_cache");
    
    return data?.nodes || [];
  } catch (error) {
    console.error("Error fetching WP product categories:", error);
    return [];
  }
};
