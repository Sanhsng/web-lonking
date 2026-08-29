"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";

interface ProductsToolbarProps {
  totalCount: number;
  sortBy: string;
  setSortBy: (val: string) => void;
  onToggleFilter?: () => void;
  selectedCategories?: string[];
  hasFilters?: boolean;
  onClearFilters?: () => void;
}

export function ProductsToolbar({ totalCount, sortBy, setSortBy, onToggleFilter, selectedCategories = [], hasFilters, onClearFilters }: ProductsToolbarProps) {
  const isCategorySelected = selectedCategories.length === 1;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-sm w-full">
      <div className="flex items-center gap-4 w-full md:w-auto flex-wrap">
        <p className="text-body-md text-on-surface-variant">
          {isCategorySelected ? (
            <>
              Đang hiển thị <span className="font-bold text-on-surface">{totalCount}</span>{" "}
              <span className="font-semibold text-primary">{selectedCategories[0].toLowerCase()}</span> trong đội xe
            </>
          ) : !hasFilters ? (
            <>
              Đang hiển thị tất cả sản phẩm
            </>
          ) : (
            <>
              Đang hiển thị <span className="font-bold text-on-surface">{totalCount}</span> sản phẩm
            </>
          )}
        </p>
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="text-label-sm font-semibold text-primary hover:text-primary-container transition-colors underline"
          >
            Bỏ lọc
          </button>
        )}
      </div>
      <div className="flex flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
        <label
          className="text-label-sm text-on-surface-variant whitespace-nowrap hidden sm:block"
          htmlFor="sort"
        >
          Sắp xếp theo:
        </label>
        <div className="relative flex-1 min-w-[200px]">
          <select
            className="appearance-none bg-surface-bright border border-outline-variant rounded-lg py-2.5 sm:py-2 pl-4 pr-10 text-label-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer w-full h-full min-h-[44px] sm:min-h-0"
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="recommended">Được đề xuất</option>
            <option value="newest">Mới đến</option>
            <option value="weight-desc">Trọng lượng hoạt động (Cao-Thấp)</option>
            <option value="power-desc">Công suất (Cao-Thấp)</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none w-5 h-5" />
        </div>
        {/* Mobile Filter Toggle */}
        <button
          onClick={onToggleFilter}
          className="md:hidden flex items-center justify-center px-4 py-2.5 sm:py-2 min-h-[44px] sm:min-h-0 border border-outline-variant rounded-lg text-on-surface hover:bg-surface-container-low flex-shrink-0"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
