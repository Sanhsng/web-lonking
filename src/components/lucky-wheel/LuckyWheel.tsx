"use client";

import React, { useState, useRef } from "react";
import { PrizeSegment } from "./PrizeSegment";
import { SpinButton } from "./SpinButton";
import { ResultModal } from "./ResultModal";
import { Prize } from "@/types/promotion";

import { spinLuckyDraw } from "@/services/luckyDraw";

interface LuckyWheelProps {
  customerName: string;
  code: string;
  prizes: Prize[];
  segments: { prizeId: string; color: string }[];
  onComplete: () => void;
  onReset: () => void;
}

// Constants for drawing
const RADIUS = 250;
const CENTER = RADIUS;
const SVG_SIZE = RADIUS * 2;
const SPIN_DURATION_MS = 5000;

export function LuckyWheel({ customerName, code, prizes, segments, onComplete, onReset }: LuckyWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [resultPrize, setResultPrize] = useState<Prize | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverError, setServerError] = useState("");
  
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleSpin = async () => {
    if (isSpinning || segments.length === 0 || prizes.length === 0) return;
    
    setIsSpinning(true);
    setResultPrize(null);
    setIsModalOpen(false);
    setServerError("");

    try {
      // Call backend to determine prize securely
      const data = await spinLuckyDraw(code);

      if (!data.success) {
        setServerError(data.message || "Lỗi kết nối máy chủ");
        setIsSpinning(false);
        return;
      }

      // Find the prize object based on server response (assuming prize name or ID matches)
      const wonPrize = prizes.find(p => {
        if (data.prizeId && p.id === data.prizeId.toString()) return true;
        if (data.prize) {
          const apiPrizeName = data.prize.toLowerCase();
          const pName = p.name.toLowerCase();
          return pName === apiPrizeName || pName.includes(apiPrizeName) || apiPrizeName.includes(pName);
        }
        return false;
      });
      
      if (!wonPrize) {
        setServerError(`Lỗi dữ liệu: Không tìm thấy giải khớp. Response: ${JSON.stringify(data)}`);
        setIsSpinning(false);
        return;
      }

      // 2. Find all segments that map to this wonPrize
      const matchingSegmentIndices = segments
        .map((seg, idx) => (seg.prizeId === wonPrize.id ? idx : -1))
        .filter((idx) => idx !== -1);

      // 3. Pick a random segment from the matching ones to land on
      const winningIndex = matchingSegmentIndices[Math.floor(Math.random() * matchingSegmentIndices.length)];

      // Calculate rotation
      const segmentAngle = 360 / segments.length;
      const extraSpins = 5 + Math.floor(Math.random() * 5);
      const extraDegrees = extraSpins * 360;
      
      // Add randomness within the segment
      const randomOffset = Math.floor(Math.random() * (segmentAngle - 10)) + 5 - segmentAngle/2; 
      
      const currentBase = rotation - (rotation % 360);
      const newRotation = currentBase + extraDegrees + (360 - (winningIndex * segmentAngle)) + randomOffset;

      setRotation(newRotation);

      setTimeout(() => {
        setIsSpinning(false);
        setResultPrize(wonPrize);
        setIsModalOpen(true);
      }, SPIN_DURATION_MS);
      
    } catch (err) {
      console.error(err);
      setServerError("Không thể kết nối đến máy chủ.");
      setIsSpinning(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    onComplete();
  };

  return (
    <div className="relative flex flex-col items-center">
      {serverError && (
        <div className="mb-4 flex flex-col items-center bg-red-900/40 border border-red-500 px-4 py-3 rounded-lg text-sm">
          <span className="text-red-100 font-medium mb-2">{serverError}</span>
          <button 
            onClick={onReset}
            className="px-4 py-1.5 bg-red-500 hover:bg-red-400 text-white rounded-md text-xs font-bold uppercase transition-colors shadow-sm"
          >
            Thử mã khác
          </button>
        </div>
      )}

      {/* Stand Base */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-64 h-16 bg-black/20 rounded-[100%] blur-xl -z-10"></div>
      
      {/* Outer Wheel Border */}
      <div className="relative p-2 md:p-4 w-full aspect-square max-w-[550px] mx-auto rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 shadow-2xl border-4 border-yellow-200 flex items-center justify-center">
        {/* Lights (Decorative dots on the border) */}
        <div className="absolute inset-0 rounded-full border-4 border-dotted border-red-500 opacity-50 pointer-events-none animate-[spin_4s_linear_infinite]"></div>
        
        <div className="relative overflow-hidden rounded-full border-8 border-[#8b0000] shadow-inner bg-[#b30000] w-full max-w-[500px] aspect-square flex items-center justify-center">
          
          <div 
            ref={wheelRef}
            className="relative w-full h-full"
            style={{ 
              transform: `rotate(${rotation}deg)`,
              transition: `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.25, 1, 0.25, 1)`
            }}
          >
            <svg className="w-full h-full" viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}>
              <g>
                {segments.map((segment, index) => {
                  const prize = prizes.find(p => p.id === segment.prizeId);
                  return (
                    <PrizeSegment
                      key={index}
                      index={index}
                      totalSegments={segments.length}
                      name={prize?.name || ""}
                      color={segment.color}
                      image={prize?.image}
                      radius={RADIUS}
                    />
                  );
                })}
              </g>
              
              {/* Inner Center Circle to hide segment convergence */}
              <circle cx={CENTER} cy={CENTER} r="30" fill="#8b0000" />
              <circle cx={CENTER} cy={CENTER} r="25" fill="#ffd700" />
            </svg>
          </div>
          
          <SpinButton onSpin={handleSpin} isSpinning={isSpinning || !!serverError} />
          
        </div>
      </div>
      
      <ResultModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        prize={resultPrize}
        customerName={customerName}
        code={code}
      />
    </div>
  );
}
