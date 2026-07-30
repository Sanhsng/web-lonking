import { graphqlClient } from "@/lib/graphql";
import { WPProduct } from "@/types/wordpress";

const PRODUCTS_QUERY = `
query Products {
  products(first: 100) {
    nodes {
      id
      title
      slug
      content
      productCategories {
        nodes {
          name
          slug
        }
      }

      featuredImage {
        node {
          sourceUrl
        }
      }

      productFields {
        model
        engine
        bucketCapacity
        operatingWeight
        ratedPower
        liftingCapacity
        ironingCapacity
        loIPin
        powerType
        shortDescription
        isNew
        isFeatured
        productGallery {
          node {
            sourceUrl
          }
        }
        nh2 {
          node {
            sourceUrl
          }
        }
        nh3 {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}
`;

const PRODUCT_BY_SLUG_QUERY = `
query ProductBySlug($id: ID!) {
  product(id: $id, idType: SLUG) {
    id
    title
    slug
    content
    productCategories {
      nodes {
        name
        slug
      }
    }

    featuredImage {
      node {
        sourceUrl
      }
    }

    productFields {
      model
      engine
      bucketCapacity
      operatingWeight
      ratedPower
      liftingCapacity
      ironingCapacity
      loIPin
      powerType
      shortDescription
      isNew
      isFeatured
      productGallery {
        node {
          sourceUrl
        }
      }
      nh2 {
        node {
          sourceUrl
        }
      }
      nh3 {
        node {
          sourceUrl
        }
      }
    }
  }
}
`;

const GET_PRODUCT_CATEGORIES_QUERY = `
query GetProductCategories {
  productCategories(first: 100) {
    nodes {
      name
      slug
      productCategoryFields {
        categoryImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}
`;

export async function getProducts(): Promise<WPProduct[]> {
    const data = await graphqlClient.request<{ products: { nodes: WPProduct[] } }>(
        PRODUCTS_QUERY
    );

    return data.products.nodes;
}

export async function getProductBySlug(slug: string): Promise<WPProduct | null> {
    const data = await graphqlClient.request<{ product: WPProduct }>(
        PRODUCT_BY_SLUG_QUERY,
        { id: slug }
    );
    return data.product || null;
}

export const getProductCategories = async () => {
  try {
    const data = await graphqlClient.request<{
      productCategories: {
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
      }
    }>(GET_PRODUCT_CATEGORIES_QUERY);
    
    return data.productCategories?.nodes || [];
  } catch (error) {
    console.error("Error fetching WP product categories:", error);
    return [];
  }
};
