"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";

export function FooterShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    const url = window.location.href;
    const title = document.title;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        // User cancelled or share failed, silently ignore
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <button
        onClick={handleShare}
        aria-label="Chia sẻ"
        className="text-surface-variant/50 hover:text-white transition-colors flex items-center justify-center"
        title="Chia sẻ trang này"
      >
        <Share2 className="w-5 h-5" />
      </button>
      {copied && (
        <span className="absolute bottom-full right-0 mb-2 bg-white text-black text-[12px] py-1 px-2 rounded whitespace-nowrap shadow-lg font-medium opacity-90 transition-opacity">
          Đã chép link!
        </span>
      )}
    </div>
  );
}
