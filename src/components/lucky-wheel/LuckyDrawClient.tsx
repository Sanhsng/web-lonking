"use client";

import React, { useState } from "react";
import { CodeInputForm } from "./CodeInputForm";
import { LuckyWheel } from "./LuckyWheel";
import { Prize } from "@/types/promotion";

interface LuckyDrawClientProps {
  prizes: Prize[];
  segments: { prizeId: string; color: string }[];
}

export function LuckyDrawClient({ prizes, segments }: LuckyDrawClientProps) {
  const [validCode, setValidCode] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string>("");

  const handleValidCode = (code: string, customerName: string) => {
    setValidCode(code);
    setCustomerName(customerName);
  };

  const handleDrawComplete = () => {
    // Reset state to force entering a new code (or the same one, which will be blocked by validate API)
    setValidCode(null);
    setCustomerName("");
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto">
      {!validCode ? (
        <CodeInputForm onValidCode={handleValidCode} />
      ) : (
        <div className="flex flex-col items-center w-full animate-in fade-in zoom-in duration-500">
          <div className="mb-8 bg-green-500/20 border border-green-400 px-8 py-3 rounded-2xl text-center backdrop-blur-sm shadow-lg">
            <h3 className="text-green-300 font-bold text-xl mb-1">
              Chúc mừng! Bạn đủ điều kiện tham gia quay thưởng
            </h3>
            <p className="text-green-100 text-sm">
              Mã dự thưởng: <span className="font-mono font-bold tracking-wider">{validCode}</span>
            </p>
          </div>
          
          <LuckyWheel 
            customerName={customerName}
            code={validCode}
            prizes={prizes}
            segments={segments}
            onComplete={handleDrawComplete}
            onReset={handleDrawComplete}
          />
        </div>
      )}
    </div>
  );
}

