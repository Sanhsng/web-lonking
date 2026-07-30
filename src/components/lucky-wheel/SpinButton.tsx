import React from "react";

interface SpinButtonProps {
  onSpin: () => void;
  isSpinning: boolean;
}

export function SpinButton({ onSpin, isSpinning }: SpinButtonProps) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center">
      {/* Outer decorative ring */}
      <div className="w-28 h-28 rounded-full bg-yellow-400 p-1 shadow-[0_0_20px_rgba(255,215,0,0.5)]">
        <button
          onClick={onSpin}
          disabled={isSpinning}
          className={`w-full h-full rounded-full bg-gradient-to-b from-red-500 to-[#b30000] border-4 border-yellow-200 shadow-inner flex items-center justify-center transition-all duration-300 ${
            isSpinning
              ? "opacity-80 cursor-not-allowed scale-95"
              : "hover:scale-105 active:scale-95 cursor-pointer hover:shadow-[0_0_15px_rgba(255,0,0,0.8)]"
          }`}
        >
          <span className="text-white font-black text-xl drop-shadow-md leading-tight text-center">
            QUAY<br />NGAY
          </span>
        </button>
      </div>
      
      {/* Pointer triangle */}
      <div 
        className="absolute -top-7 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[28px] border-b-yellow-400 drop-shadow-md z-30"
        style={{ transformOrigin: "bottom center" }}
      >
        <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[22px] border-b-red-600"></div>
      </div>
    </div>
  );
}
