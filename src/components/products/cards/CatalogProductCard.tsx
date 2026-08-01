import Link from "next/link";
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
      <Link href={`/products/${slug}`} className="relative h-56 w-full overflow-hidden bg-surface-container-low block">
        {/* Status Badge */}
        {(isNew || powerType === "electric") && (
          <div className="absolute top-4 left-4 z-10 glass-panel px-3 py-1 rounded-full flex items-center gap-1">
            <span
              className={`w-2 h-2 rounded-full ${
                powerType === "electric"
                  ? "bg-tertiary-container"
                  : "bg-secondary-container"
              }`}
            ></span>
            <span className="text-label-sm font-semibold text-on-surface">
              {powerType === "electric" ? "Điện" : "Mới"}
            </span>
          </div>
        )}
        <div
          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </Link>
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-title-lg font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2" title={title}>
            <Link href={`/products/${slug}`}>{title}</Link>
          </h3>
          <button 
            className={`transition-colors flex-shrink-0 p-2 -mr-2 -mt-2 rounded-full hover:bg-surface-variant/30 active:scale-95 ${isLiked ? 'text-primary' : 'text-outline hover:text-primary'}`}
            onClick={(e) => {
              e.preventDefault();
              onToggleLike?.(slug);
            }}
          >
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>
        <p className="text-body-sm text-on-surface-variant mb-6 flex-grow line-clamp-3">
          {description}
        </p>
        <div className="grid grid-cols-2 gap-3 mb-6 bg-surface-bright p-3 rounded-lg border border-outline-variant/20">
          {specs.map((spec, index) => (
            <div key={index} className="flex items-center gap-2 overflow-hidden">
              <div className="text-primary flex-shrink-0">{spec.icon}</div>
              <span className="text-label-sm text-on-surface-variant truncate" title={String(spec.label)}>
                {spec.label}
              </span>
            </div>
          ))}
        </div>
        <Link
          href={`/products/${slug}`}
          className="w-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-on-primary py-3 rounded-xl text-label-md font-semibold transition-colors duration-200 flex justify-center items-center gap-2"
        >
          Xem chi tiết <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
