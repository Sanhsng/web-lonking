import React from "react";

export interface CatalogProductSpec {
  icon: React.ReactNode;
  label: string;
}

export interface CatalogProductCardProps {
  slug: string;
  title: string;
  description: string;
  image: string;
  isNew?: boolean;
  powerType?: "electric" | "diesel";
  specs: CatalogProductSpec[];
  isLiked?: boolean;
  onToggleLike?: (slug: string) => void;
}
