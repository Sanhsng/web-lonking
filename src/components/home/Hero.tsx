"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const defaultHeroImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCfvjTxHgx5ih7pv-cm7UpxcQfR-ynsgzhya5YfzRbYntdd-BHo-2hP4zW4DHxm4nhzRQJd6l-uYXF1vVXrffWUbu8IWpHPYDSTHEnZRXrBmasUCsUouR2066qCwBHcg1TGxH-eNVEakcEducthWm_xxnfwJonCs3tZ1uUhLXp8WB8STqsauOa6rtxCcamMuoR8DXhkq-B6To1GfgY2s90884fTkdzwBXK6QXzM45WgEW_VQFUTUDThnZ__L7TJbePtzMXGDXM4AQQ",
  "/images/banners/hero_1.png",
  "/images/banners/hero_2.png",
  "/images/banners/hero_3.png"
];

interface HeroProps {
  images?: string[];
  title?: string;
  description?: string;
}

export function Hero({ images, title, description }: HeroProps) {
  const heroImages = images && images.length > 0 ? images : defaultHeroImages;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-auto aspect-video sm:aspect-auto min-h-0 sm:min-h-[650px] lg:min-h-[700px] flex items-center sm:items-end pt-12 sm:pt-24 pb-4 sm:pb-16 md:pb-24 overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0 bg-[#001b3b]">
        {heroImages.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-[center_top] sm:bg-center transition-opacity duration-[2000ms] ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url("${src}")` }}
          ></div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#001b3b]/95 via-[#001b3b]/50 to-transparent sm:bg-gradient-to-r sm:from-[#001b3b]/85 sm:to-[#001b3b]/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-container-max mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-8 mt-4 sm:mt-0">
        <div className="md:col-span-10 lg:col-span-8 flex flex-col gap-0.5 sm:gap-6">
          <h1 className="text-[16px] sm:text-[40px] md:text-headline-xl text-white font-black tracking-tighter leading-tight sm:leading-[1.1]">
            {title || "Thiết bị công trình đáng tin cậy cho mọi dự án xây dựng"}
          </h1>
          <p className="text-[10px] sm:text-body-lg text-surface-variant/90 max-w-xl line-clamp-2 sm:line-clamp-none leading-snug sm:leading-normal">
            {description || "Máy móc cao cấp được thiết kế để mang lại hiệu suất, độ bền và năng suất tối đa trên những công trường khắc nghiệt nhất thế giới. Bền bỉ. Đích thực LOVOL."}
          </p>
          <div className="flex flex-row items-center sm:items-start justify-start gap-2 sm:gap-4 pt-1 sm:pt-4 w-full">
            <Link
              href="/products"
              className="group bg-secondary-container hover:bg-[#F2A200] text-on-secondary-fixed font-semibold text-[10px] sm:text-label-md sm:font-bold px-3 py-2 sm:px-8 sm:py-4 rounded-md sm:rounded-[16px] transition-all duration-300 active:scale-[0.98] shadow-sm sm:shadow-lg hover:shadow-xl hover:-translate-y-1 uppercase tracking-wider flex justify-center items-center gap-1"
            >
              Xem sản phẩm
              <ArrowRight className="w-3 h-3 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
            <Link
              href="/contact"
              className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/40 hover:-translate-y-1 font-semibold text-[10px] sm:text-label-md px-3 py-2 sm:px-8 sm:py-4 rounded-md sm:rounded-[16px] transition-all duration-300 active:scale-[0.98] uppercase tracking-wider flex justify-center items-center gap-1 text-center hover:shadow-lg"
            >
              Yêu cầu tư vấn
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
