"use client";

import { useState, useEffect } from "react";
import { Share2, Link as LinkIcon, Mail } from "lucide-react";

interface ShareButtonsProps {
  title: string;
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleShare = async () => {
    if (!url) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback to Facebook share if native share is not supported
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        "_blank"
      );
    }
  };

  const handleCopyLink = () => {
    if (!url) return;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShareEmail = () => {
    if (!url) return;
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`Bạn có thể xem bài viết tại đây: ${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleShare}
        title="Chia sẻ"
        className="w-10 h-10 rounded-full bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface-variant flex items-center justify-center transition-colors"
      >
        <Share2 className="w-5 h-5" />
      </button>
      <button
        onClick={handleCopyLink}
        title={copied ? "Đã sao chép!" : "Sao chép đường dẫn"}
        className="w-10 h-10 rounded-full bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface-variant flex items-center justify-center transition-colors relative"
      >
        <LinkIcon className="w-5 h-5" />
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow">
            Đã chép
          </span>
        )}
      </button>
      <button
        onClick={handleShareEmail}
        title="Chia sẻ qua Email"
        className="w-10 h-10 rounded-full bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface-variant flex items-center justify-center transition-colors"
      >
        <Mail className="w-5 h-5" />
      </button>
    </div>
  );
}
