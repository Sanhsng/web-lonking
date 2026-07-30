import Link from "next/link";
import Image from "next/image";
import React from "react";
import { BlogCardProps } from "@/types/blog";

export function BlogCard({
  slug,
  category,
  title,
  description,
  image,
  date,
  readTime,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group bg-white rounded-[16px] overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.05),0_10px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.05),0_15px_30px_-5px_rgba(0,0,0,0.08)] hover:-translate-y-1 border border-outline-variant/20 flex flex-col h-full transition-all duration-300"
    >
      <div className="h-48 overflow-hidden relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-label-sm font-semibold text-primary">
          {category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-headline-md text-on-surface mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-body-md text-on-surface-variant mb-6 flex-grow line-clamp-3">
          {description}
        </p>
        <div className="flex items-center gap-2 text-label-sm text-outline mt-auto">
          <span>{date}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>
      </div>
    </Link>
  );
}
