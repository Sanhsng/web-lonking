"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";

interface ProductsToolbarProps {
  totalCount: number;
  sortBy: string;
  setSortBy: (val: string) => void;
}

export function ProductsToolbar({ totalCount, sortBy, setSortBy }: ProductsToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 shadow-sm">
      <p className="text-body-md text-on-surface-variant">
        Đang hiển thị <span className="font-bold text-on-surface">{totalCount}</span> máy trong đội xe
      </p>
      <div className="flex items-center gap-3">
        <label
          className="text-label-sm text-on-surface-variant whitespace-nowrap"
          htmlFor="sort"
        >
          Sắp xếp theo:
        </label>
        <div className="relative">
          <select
            className="appearance-none bg-surface-bright border border-outline-variant rounded-lg py-2 pl-4 pr-10 text-label-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer"
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
        <button className="md:hidden flex items-center justify-center p-2 border border-outline-variant rounded-lg text-on-surface hover:bg-surface-container-low">
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
