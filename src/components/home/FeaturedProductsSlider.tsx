"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export function FeaturedProductsSlider({ children }: { children: React.ReactNode }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      // Adding a small threshold to avoid precision issues
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scrollBy = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex overflow-x-auto pb-6 snap-x snap-mandatory gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 md:gap-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      >
        {children}
      </div>

      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scrollBy("left")}
          aria-label="Cuộn sang trái"
          className="absolute left-0 top-0 bottom-6 w-12 bg-gradient-to-r from-surface/40 to-transparent sm:hidden flex items-center justify-start pl-2 z-10 -ml-4 outline-none hover:opacity-80 transition-opacity"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-sm text-on-surface-variant border border-outline-variant/50">
            <ChevronLeft className="w-6 h-6" />
          </div>
        </button>
      )}

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={() => scrollBy("right")}
          aria-label="Cuộn sang phải"
          className="absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-surface/40 to-transparent sm:hidden flex items-center justify-end pr-2 z-10 -mr-4 outline-none hover:opacity-80 transition-opacity"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-sm text-on-surface-variant border border-outline-variant/50 animate-pulse">
            <ChevronRight className="w-6 h-6" />
          </div>
        </button>
      )}
    </div>
  );
}
