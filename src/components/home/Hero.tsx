"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const heroImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCfvjTxHgx5ih7pv-cm7UpxcQfR-ynsgzhya5YfzRbYntdd-BHo-2hP4zW4DHxm4nhzRQJd6l-uYXF1vVXrffWUbu8IWpHPYDSTHEnZRXrBmasUCsUouR2066qCwBHcg1TGxH-eNVEakcEducthWm_xxnfwJonCs3tZ1uUhLXp8WB8STqsauOa6rtxCcamMuoR8DXhkq-B6To1GfgY2s90884fTkdzwBXK6QXzM45WgEW_VQFUTUDThnZ__L7TJbePtzMXGDXM4AQQ",
  "/images/banners/hero_1.png",
  "/images/banners/hero_2.png",
  "/images/banners/hero_3.png"
];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[650px] lg:h-[700px] min-h-[500px] flex items-center overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0 bg-[#001b3b]">
        {heroImages.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url("${src}")` }}
          ></div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001b3b]/85 to-[#001b3b]/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-container-max mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8 lg:col-span-7 flex flex-col gap-6">
          <h1 className="font-headline-xl text-[40px] md:text-headline-xl text-white font-black tracking-tighter leading-[1.1]">
            Thiết bị công trình đáng tin cậy cho mọi dự án xây dựng
          </h1>
          <p className="font-body-lg text-body-lg text-surface-variant/90 max-w-xl">
            Máy móc cao cấp được thiết kế để mang lại hiệu suất, độ bền và
            năng suất tối đa trên những công trường khắc nghiệt nhất thế giới.
            Bền bỉ. Đích thực LONKING.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="/products"
              className="bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary-fixed font-label-md text-label-md px-8 py-4 rounded-[16px] transition-all duration-200 active:scale-[0.98] shadow-lg font-bold uppercase tracking-wider flex items-center gap-2"
            >
              Xem sản phẩm
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 font-label-md text-label-md px-8 py-4 rounded-[16px] transition-all duration-200 active:scale-[0.98] font-semibold uppercase tracking-wider flex items-center gap-2"
            >
              Yêu cầu tư vấn
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
