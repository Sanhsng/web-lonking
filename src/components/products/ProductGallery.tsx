"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  title: string;
  model?: string;
  isNew?: boolean;
}

export function ProductGallery({ images, title, model, isNew }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const mainImage = images.length > 0 ? images[selectedIndex] : "https://placehold.co/600x400?text=No+Image";

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="bg-surface-container-low rounded-2xl overflow-hidden relative aspect-[4/3] flex items-center justify-center border border-outline-variant/50">
        <Image
          src={mainImage}
          alt={title}
          fill
          className="object-cover"
          unoptimized
        />
        {model && (
          <div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-label-sm font-bold shadow-sm">
            Model: {model}
          </div>
        )}
        {isNew && (
          <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 rounded-full text-label-sm font-bold shadow-sm">
            Mới
          </div>
        )}
      </div>
      
      {/* Gallery Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((imgSrc, index) => (
            <button 
              key={index} 
              onClick={() => setSelectedIndex(index)}
              className={`rounded-lg overflow-hidden border relative aspect-[4/3] ${index === selectedIndex ? 'border-2 border-primary' : 'border-outline-variant/50 hover:border-primary/50 opacity-70 hover:opacity-100'} transition-colors`}
            >
              <Image
                src={imgSrc}
                alt={`${title} gallery ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
