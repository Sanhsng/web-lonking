import { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "LONKING VIỆT NAM | Thiết bị công trình đáng tin cậy cho mọi dự án xây dựng. Bền bỉ. Đích thực LONKING.",
  description:
    "Thiết bị công trình đáng tin cậy cho mọi dự án xây dựng. Bền bỉ. Đích thực LONKING.",
};

export default function HomePage() {
  return (
    <main className="pt-20">
      <Hero />
      <CategoriesGrid />
      <FeaturedProducts />
      <CTASection />
    </main>
  );
}
