"use client";

import { useState } from "react";
import { Search, ChevronUp, ChevronDown, X } from "lucide-react";

interface ProductsSidebarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (val: string[]) => void;
  selectedPowerType: string;
  setSelectedPowerType: (val: string) => void;
  categoryCounts: { name: string; count: number }[];
  weightRange: [number, number];
  setWeightRange: (val: [number, number]) => void;
  isMobileOpen?: boolean;
  onClose?: () => void;
}

function DualSlider({ min, max, value, onChange }: { min: number, max: number, value: [number, number], onChange: (val: [number, number]) => void }) {
  return (
    <div className="relative h-6 flex items-center mb-4">
      <div className="absolute w-full h-1.5 bg-surface-variant rounded-full"></div>
      <div 
        className="absolute h-1.5 bg-primary rounded-full"
        style={{ 
          left: `${((value[0] - min) / (max - min)) * 100}%`,
          right: `${100 - ((value[1] - min) / (max - min)) * 100}%` 
        }}
      ></div>
      <input 
        type="range"
        min={min} max={max}
        value={value[0]}
        onChange={e => {
          const v = Math.min(Number(e.target.value), value[1] - 5);
          onChange([v, value[1]]);
        }}
        className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-sm z-10"
      />
      <input 
        type="range"
        min={min} max={max}
        value={value[1]}
        onChange={e => {
          const v = Math.max(Number(e.target.value), value[0] + 5);
          onChange([value[0], v]);
        }}
        className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-sm z-20"
      />
    </div>
  );
}

export function ProductsSidebar({
  searchQuery,
  setSearchQuery,
  selectedCategories,
  setSelectedCategories,
  selectedPowerType,
  setSelectedPowerType,
  categoryCounts,
  weightRange,
  setWeightRange,
  isMobileOpen,
  onClose,
}: ProductsSidebarProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPowerTypeOpen, setIsPowerTypeOpen] = useState(true);
  const [isWeightOpen, setIsWeightOpen] = useState(true);

  const handleCategoryChange = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <aside className={`
        fixed inset-y-0 left-0 w-[280px] sm:w-[320px] bg-surface z-50 p-6 flex flex-col max-h-screen overflow-y-auto custom-scrollbar transition-transform duration-300
        ${isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        md:relative md:inset-auto md:w-auto md:bg-transparent md:z-auto md:p-0 md:translate-x-0 md:col-span-3 md:sticky md:top-28 md:max-h-[calc(100vh-8rem)] md:pr-4 md:shadow-none md:block
      `}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-headline-sm font-bold text-on-surface hidden md:block">Bộ lọc</h3>
          <h3 className="font-headline-sm font-bold text-on-surface md:hidden">Bộ lọc</h3>
          
          <div className="flex items-center gap-2">
            {(searchQuery !== "" || selectedCategories.length > 0 || selectedPowerType !== "Tất cả" || weightRange[0] !== 0 || weightRange[1] !== 150) && (
              <button 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategories([]);
                  setSelectedPowerType("Tất cả");
                  setWeightRange([0, 150]);
                }}
                className="text-label-md font-semibold text-primary hover:text-primary/80 transition-colors px-2 py-1"
              >
                Bỏ lọc
              </button>
            )}
            <button onClick={onClose} className="p-2 -mr-2 text-outline hover:text-on-surface rounded-full hover:bg-surface-container-low transition-colors md:hidden">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Search */}
        <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-5 h-5 pointer-events-none" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-2.5 pl-10 pr-10 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            placeholder="Tìm kiếm mẫu máy..."
            type="text"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
              title="Xóa tìm kiếm"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter: Category */}
      <div className="mb-6 border-b border-outline-variant/30 pb-6">
        <button
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="w-full text-label-md text-on-surface mb-4 flex justify-between items-center cursor-pointer font-semibold"
        >
          <span>Danh mục</span>
          {isCategoryOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        {isCategoryOpen && (
          <div className="flex flex-col gap-3">
            {categoryCounts.map((cat) => (
              <label key={cat.name} className="flex items-center gap-3 cursor-pointer group">
                <input
                  checked={selectedCategories.includes(cat.name)}
                  onChange={() => handleCategoryChange(cat.name)}
                  className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary bg-surface-container-lowest"
                  type="checkbox"
                />
                <span className="text-body-md text-on-surface-variant group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
                <span className="ml-auto text-label-sm text-outline">{cat.count}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Filter: Power Type */}
      <div className="mb-6 border-b border-outline-variant/30 pb-6">
        <button
          onClick={() => setIsPowerTypeOpen(!isPowerTypeOpen)}
          className="w-full text-label-md text-on-surface mb-4 flex justify-between items-center cursor-pointer font-semibold"
        >
          <span>Nguồn nhiên liệu</span>
          {isPowerTypeOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        {isPowerTypeOpen && (
          <div className="flex flex-col gap-3">
            {["Dầu", "Điện", "Tất cả"].map((power) => (
              <label key={power} className="flex items-center gap-3 cursor-pointer group">
                <input
                  checked={selectedPowerType === power}
                  onChange={() => setSelectedPowerType(power)}
                  className="w-5 h-5 border-outline-variant text-primary focus:ring-primary bg-surface-container-lowest"
                  name="power_type"
                  type="radio"
                />
                <span className="text-body-md text-on-surface-variant group-hover:text-primary transition-colors">{power}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Filter: Operating Weight */}
      <div className="mb-6 border-b border-outline-variant/30 pb-6">
        <button
          onClick={() => setIsWeightOpen(!isWeightOpen)}
          className="w-full text-label-md text-on-surface mb-4 flex justify-between items-center cursor-pointer font-semibold"
        >
          <span>Trọng lượng hoạt động</span>
          {isWeightOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        {isWeightOpen && (
          <div className="px-2 mt-2">
            <DualSlider min={0} max={150} value={weightRange} onChange={setWeightRange} />
            <div className="flex justify-between text-label-sm text-on-surface-variant">
              <span>{weightRange[0]}t</span>
              <span>{weightRange[1]}t{weightRange[1] === 150 ? "+" : ""}</span>
            </div>
          </div>
        )}
      </div>
    </aside>
    </>
  );
}
