import { graphqlClient } from "@/lib/graphql";
import { gql } from "graphql-request";

export interface HeroData {
  images: string[];
  title?: string;
  description?: string;
}

const GET_HERO_BANNERS_QUERY = gql`
  query GetHeroBanners {
    pages(where: { title: "Website Settings" }) {
      nodes {
        websiteSettings {
          heroTitle
          heroDescription
          heroBackground {
            node {
              sourceUrl
            }
          }
          heroBackground2 {
            node {
              sourceUrl
            }
          }
          heroBackground3 {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export async function getHeroData(): Promise<HeroData> {
  try {
    const data = await graphqlClient.request<any>(GET_HERO_BANNERS_QUERY);
    const settings = data?.pages?.nodes?.[0]?.websiteSettings;
    
    const images = [
      settings?.heroBackground?.node?.sourceUrl,
      settings?.heroBackground2?.node?.sourceUrl,
      settings?.heroBackground3?.node?.sourceUrl,
    ].filter(Boolean) as string[];

    return {
      images,
      title: settings?.heroTitle,
      description: settings?.heroDescription,
    };
  } catch (error) {
    console.error("Error fetching hero data:", error);
    return { images: [] };
  }
}
