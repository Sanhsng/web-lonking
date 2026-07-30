"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({ currentPage = 1, totalPages = 1, onPageChange }: PaginationProps) {
  if (totalPages === 0) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-auto pt-8">
      {totalPages > 1 && (
        <button
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange?.(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg font-label-md transition-colors ${
            currentPage === page
              ? "bg-primary text-on-primary shadow-sm"
              : "border border-outline-variant text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
          }`}
        >
          {page}
        </button>
      ))}

      {totalPages > 1 && (
        <button
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
