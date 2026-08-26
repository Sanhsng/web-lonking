import { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CTASection } from "@/components/home/CTASection";
import { getHeroData } from "@/services/banners";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "LOVOL Việt Nam | Máy công trình chính hãng",
  description:
    "LOVOL Việt Nam cung cấp máy công trình chính hãng với công nghệ tiên tiến, hiệu suất mạnh mẽ và độ bền cao, đáp ứng nhu cầu xây dựng, khai thác và san lấp.",
};

export default async function HomePage() {
  const heroData = await getHeroData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LOVOL Việt Nam",
    "image": `${siteConfig.url}/images/banners/about-banner.jpg`,
    "description": "Nhà phân phối máy công trình Lovol chính hãng tại Việt Nam.",
    "url": siteConfig.url,
    "telephone": "0914881911",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Phù Dực 1",
      "addressLocality": "Phù Đổng",
      "addressRegion": "Gia Lâm, Hà Nội",
      "addressCountry": "VN"
    }
  };

  return (
    <main className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero
        images={heroData.images.length > 0 ? heroData.images : undefined}
        title={heroData.title}
        description={heroData.description}
      />
      <CategoriesGrid />
      <FeaturedProducts />
      <CTASection />
    </main>
  );
}
