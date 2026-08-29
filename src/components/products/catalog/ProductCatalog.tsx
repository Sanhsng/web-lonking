"use client";

import { useState, useMemo, useEffect } from "react";
import { ProductsSidebar } from "./ProductsSidebar";
import { ProductsToolbar } from "./ProductsToolbar";
import { CatalogProductCard } from "../cards/CatalogProductCard";
import { Pagination } from "@/components/ui/Pagination";

export type Product = {
  slug: string;
  title: string;
  description: string;
  image: string;
  isNew?: boolean;
  powerType?: "diesel" | "electric";
  category: string;
  categorySlug?: string;
  weight: number;
  power: number;
  specs: { icon: React.ReactNode; label: string }[];
};

interface ProductCatalogProps {
  products: Product[];
}

export function ProductCatalog({ products }: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  // Mặc định không chọn category nào để hiện tất cả (nếu muốn mặc định Máy ủi thì đổi thành ["Máy ủi"])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPowerType, setSelectedPowerType] = useState<string>("Tất cả");
  const [weightRange, setWeightRange] = useState<[number, number]>([0, 150]);
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("likedProducts");
      if (saved) {
        try {
          setLikedProducts(JSON.parse(saved));
        } catch (e) { }
      }
    }
  }, []);

  const toggleLike = (slug: string) => {
    setLikedProducts((prev) => {
      const newLikes = prev.includes(slug)
        ? prev.filter((p) => p !== slug)
        : [...prev, slug];
      if (typeof window !== "undefined") {
        localStorage.setItem("likedProducts", JSON.stringify(newLikes));
      }
      return newLikes;
    });
  };

  // Lấy keyword tìm kiếm và danh mục từ URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("search");
      if (q) {
        setSearchQuery(q);
      }

      const catSlug = params.get("category");
      if (catSlug) {
        const matchedProduct = products.find(p => p.categorySlug === catSlug);
        if (matchedProduct) {
          setSelectedCategories([matchedProduct.category]);
        }
      }
    }
  }, [products]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, selectedPowerType, weightRange, sortBy]);

  // Handle body scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileFilterOpen]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Tìm kiếm tổng hợp (Tên, Danh mục, Mô tả) - Bỏ qua dấu tiếng Việt
      if (searchQuery) {
        const normalize = (str: string) =>
          str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

        const q = normalize(searchQuery);
        const matchTitle = normalize(p.title).includes(q);
        const matchCategory = normalize(p.category).includes(q);
        const matchDesc = normalize(p.description).includes(q);

        if (!matchTitle && !matchCategory && !matchDesc) {
          return false;
        }
      }
      // 2. Lọc theo danh mục
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) {
        return false;
      }
      // 3. Lọc theo nguồn nhiên liệu
      if (selectedPowerType !== "Tất cả") {
        if (selectedPowerType === "Dầu" && p.powerType !== "diesel") return false;
        if (selectedPowerType === "Điện" && p.powerType !== "electric") return false;
      }
      // 4. Lọc theo trọng lượng
      let pWeight = p.weight;
      if (pWeight > 1000) pWeight = pWeight / 1000; // Convert kg to tons if needed

      if (pWeight < weightRange[0]) {
        return false;
      }
      if (weightRange[1] < 150 && pWeight > weightRange[1]) {
        return false;
      }
      return true;
    });
  }, [products, searchQuery, selectedCategories, selectedPowerType, weightRange]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      if (!counts[p.category]) {
        counts[p.category] = 0;
      }
      counts[p.category]++;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [products]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case "newest":
        sorted.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case "weight-desc":
        sorted.sort((a, b) => b.weight - a.weight);
        break;
      case "power-desc":
        sorted.sort((a, b) => b.power - a.power);
        break;
      case "recommended":
      default:
        break;
    }

    return sorted.sort((a, b) => {
      const aLiked = likedProducts.includes(a.slug);
      const bLiked = likedProducts.includes(b.slug);
      if (aLiked && !bLiked) return -1;
      if (!aLiked && bLiked) return 1;
      return 0;
    });
  }, [filteredProducts, sortBy, likedProducts]);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const hasFilters = searchQuery !== "" || selectedCategories.length > 0 || selectedPowerType !== "Tất cả" || weightRange[0] !== 0 || weightRange[1] !== 150;
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedPowerType("Tất cả");
    setWeightRange([0, 150]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
      <ProductsSidebar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedPowerType={selectedPowerType}
        setSelectedPowerType={setSelectedPowerType}
        categoryCounts={categoryCounts}
        weightRange={weightRange}
        setWeightRange={setWeightRange}
        isMobileOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
      />

      <div className="md:col-span-9 flex flex-col">
        <ProductsToolbar
          totalCount={filteredProducts.length}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onToggleFilter={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          selectedCategories={selectedCategories}
          hasFilters={hasFilters}
          onClearFilters={handleClearFilters}
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-stack-gap mb-4 md:mb-6">
          {paginatedProducts.map((product) => (
            <CatalogProductCard
              key={product.slug}
              {...product}
              isLiked={likedProducts.includes(product.slug)}
              onToggleLike={toggleLike}
            />
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-12 text-on-surface-variant bg-surface-container-lowest rounded-2xl border border-outline-variant/30">
              Không tìm thấy sản phẩm nào phù hợp với bộ lọc hiện tại.
            </div>
          )}
        </div>

        {totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
