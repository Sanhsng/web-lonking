import { fetchFromUpstash } from "@/lib/redis";

export interface HeroData {
  images: string[];
  title?: string;
  description?: string;
}

export async function getHeroData(): Promise<HeroData> {
  try {
    // Dữ liệu trong wp_hero_banners_cache là nội dung của data.pages
    const pages = await fetchFromUpstash<any>("wp_hero_banners_cache");
    const settings = pages?.nodes?.[0]?.websiteSettings;

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
