import { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CTASection } from "@/components/home/CTASection";
import { getHeroData } from "@/services/banners";

export const metadata: Metadata = {
  title: "LOVOL VIỆT NAM | Thiết bị công trình đáng tin cậy cho mọi dự án xây dựng. Bền bỉ. Đích thực LOVOL.",
  description:
    "Thiết bị công trình đáng tin cậy cho mọi dự án xây dựng. Bền bỉ. Đích thực LOVOL.",
};

export default async function HomePage() {
  const heroData = await getHeroData();

  return (
    <main className="pt-20">
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
