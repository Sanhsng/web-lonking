import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight } from "lucide-react";
import React from "react";

import { CatalogProductCardProps } from "@/types/product";

export function CatalogProductCard({
  slug,
  title,
  description,
  image,
  isNew,
  powerType,
  specs,
  isLiked,
  onToggleLike,
}: CatalogProductCardProps) {
  return (
    <div className="group bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
      <Link href={`/products/${slug}`} className="relative h-32 sm:h-48 lg:h-56 w-full overflow-hidden bg-surface-container-low block">
        {/* Status Badge */}
        {(isNew || powerType === "electric") && (
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 glass-panel px-2 py-0.5 sm:px-3 sm:py-1 rounded-full flex items-center gap-1">
            <span
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                powerType === "electric"
                  ? "bg-tertiary-container"
                  : "bg-secondary-container"
              }`}
            ></span>
            <span className="text-[10px] sm:text-label-sm font-semibold text-on-surface">
              {powerType === "electric" ? "Điện" : "Mới"}
            </span>
          </div>
        )}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>
      <div className="p-3 sm:p-5 lg:p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1 sm:mb-2 gap-1 sm:gap-2">
          <h3 className="text-[14px] sm:text-[16px] lg:text-title-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-tight" title={title}>
            <Link href={`/products/${slug}`}>{title}</Link>
          </h3>
          <button 
            className={`transition-colors flex-shrink-0 p-1.5 sm:p-2 -mr-1 sm:-mr-2 -mt-1 sm:-mt-2 rounded-full hover:bg-surface-variant/30 active:scale-95 ${isLiked ? 'text-primary' : 'text-outline hover:text-primary'}`}
            onClick={(e) => {
              e.preventDefault();
              onToggleLike?.(slug);
            }}
          >
            <Heart className={`w-4 h-4 sm:w-5 sm:h-6 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>
        <p className="text-[12px] sm:text-body-sm text-on-surface-variant mb-3 sm:mb-6 flex-grow line-clamp-2 sm:line-clamp-3">
          {description}
        </p>
        <div className="grid grid-cols-2 gap-1.5 sm:gap-3 mb-3 sm:mb-6 bg-surface-bright p-1.5 sm:p-3 rounded-lg border border-outline-variant/20">
          {specs.map((spec, index) => (
            <div key={index} className="flex items-center gap-1 sm:gap-2 overflow-hidden">
              <div className="text-primary flex-shrink-0 [&_svg]:w-3 [&_svg]:h-3 sm:[&_svg]:w-[18px] sm:[&_svg]:h-[18px]">{spec.icon}</div>
              <span className="text-[9px] sm:text-label-sm text-on-surface-variant truncate leading-none pt-0.5" title={String(spec.label)}>
                {spec.label}
              </span>
            </div>
          ))}
        </div>
        <Link
          href={`/products/${slug}`}
          className="w-full bg-white border sm:border-2 border-primary text-primary hover:bg-primary hover:text-on-primary py-1.5 sm:py-3 rounded-lg sm:rounded-xl text-[12px] sm:text-label-md font-semibold transition-colors duration-200 flex justify-center items-center gap-1 sm:gap-2"
        >
          Xem chi tiết <ArrowRight className="w-3 h-3 sm:w-5 sm:h-5" />
        </Link>
      </div>
    </div>
  );
}
